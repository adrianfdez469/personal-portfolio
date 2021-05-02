import { getSession } from 'next-auth/client';
// import prisma from '../../prisma/prisma.instance';
import SkillCatergories from '../../constants/skillsCategorysConst';
import getPreviewData from '../../libs/metascraper';
import ProxyProvider from '../../libs/integrations/provider.proxy';
import { getSlug } from '../../libs/generators';
import { getPublicIdFromImageUrl } from '../../libs/helpers';
import { deleteImagesPromise } from '../../libs/integrations/cloudinary';

const resolvers = {
  MutationResponse: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType() {
      return null;
    },
  },
  Query: {
    /* users: (parent, args) =>
      prisma.user.findMany({
        where: { ...args },
      }), */
    user: (parent, args, { prisma }) =>
      prisma.user.findUnique({
        where: {
          id: +args.id,
        },
      }),
    userBySlug: (parent, args, { prisma }) =>
      prisma.user.findFirst({
        where: {
          slug: args.slug,
          publicProfile: true,
        },
      }),
    projects: (parent, args, { prisma }) =>
      prisma.project.findMany({
        where: { ...args },
      }),
    projectBySlug: (parent, args, { prisma }) =>
      prisma.project.findFirst({
        where: {
          projectSlug: args.projectSlug,
        },
      }),
    skills: (parent, args, { prisma }) =>
      prisma.skill.findMany({
        where: { ...args },
      }),
    link: (parent, args) => getPreviewData(args.url),
    providerRepos: async (parent, args, context) => {
      const provider = ProxyProvider(args.provider);
      return provider.getRepos(context);
    },
    providerRepoData: async (parent, args, context) => {
      const provider = ProxyProvider(args.provider);
      return provider.getRepoData(context, args.id);
    },
    providerUserData: async (parent, args, context) => {
      const provider = ProxyProvider(args.provider);
      return provider.getUserDataByContext(context);
    },
    getUserTokens: async (parent, { userId }, { prisma }) =>
      prisma.userTokens.findMany({
        where: {
          userId: +userId,
        },
        select: {
          accessToken: false,
          id: true,
          userId: true,
          provider: true,
        },
      }),
  },
  Mutation: {
    createSkill: (parent, args, { prisma }) => {
      const { name, category } = args;
      return prisma.skill
        .create({
          data: {
            name,
            category: category || SkillCatergories.OTHER,
          },
        })
        .then((skill) => ({
          code: 201,
          success: true,
          message: 'SKILL_CREATED',
          skill,
        }))
        .catch(() => ({
          code: 500,
          success: false,
          message: 'ERROR',
          skill: null,
        }));
    },
    saveProject: async (parent, args, context) => {
      try {
        const { projectId, project } = args;
        const { userId } = await getSession(context);
        const { projectLink, projectDevLink, skills, images, logoUrl, collaborators } = project;

        let skillIds = [];
        let iniDate = null;
        let endDate = null;

        if (project.initialDate) {
          iniDate = new Date(+project.initialDate).toISOString();
        }
        if (project.finalDate) {
          endDate = new Date(+project.finalDate).toISOString();
        }

        if (skills && skills.length > 0) {
          skillIds = await Promise.all(
            skills.map(
              (skill) =>
                new Promise((resolve) => {
                  if (skill.id) {
                    resolve(+skill.id);
                  } else {
                    context.prisma.skill
                      .findFirst({
                        where: {
                          category: skill.category,
                          name: skill.name,
                        },
                      })
                      .then((existimgSkill) => {
                        if (existimgSkill) {
                          resolve(+existimgSkill.id);
                        } else {
                          context.prisma.skill
                            .create({
                              data: { name: skill.name, category: skill.category },
                            })
                            .then((sk) => resolve(+sk.id));
                        }
                      });
                  }
                })
            )
          );
        }

        const projectSlug = getSlug(project.name);

        let existProject;
        if (projectId) {
          existProject = await context.prisma.project.findFirst({
            where: {
              projectSlug,
              AND: {
                id: {
                  not: +projectId,
                },
              },
            },
          });
        } else {
          existProject = await context.prisma.project.findFirst({
            where: {
              projectSlug,
            },
          });
        }

        if (existProject) {
          const error = new Error();
          error.type = 'DUPLICATE';
          error.code = 409;
          throw error;
        }

        const savedProject = await context.prisma.project.upsert({
          where: {
            id: +projectId || -1,
          },
          create: {
            userId,
            name: project.name,
            description: project.description,
            initialDate: iniDate,
            finalDate: endDate,
            otherInfo: project.otherInfo,
            projectLink,
            projectDevLink,
            skills: {
              create: skillIds.map((skill) => ({
                skillId: skill,
              })),
            },
            images: {
              create: images.map((img) => ({
                imageUrl: img,
              })),
            },
            collaborators: {
              create: collaborators,
            },
            logoUrl,
            projectSlug: getSlug(project.name),
          },
          update: {
            name: project.name,
            description: project.description,
            initialDate: iniDate,
            finalDate: endDate,
            otherInfo: project.otherInfo,
            projectLink,
            projectDevLink,
            skills: {
              deleteMany: {},
              create: skillIds.map((skill) => ({
                skillId: skill,
              })),
            },
            images: {
              deleteMany: {},
              create: images.map((img) => ({
                imageUrl: img,
              })),
            },
            collaborators: {
              deleteMany: {},
              create: collaborators,
            },
            logoUrl,
            ...(project.name && { projectSlug: getSlug(project.name) }),
          },
        });

        return {
          code: 201,
          success: true,
          message: 'PROJECT_CREATED',
          project: savedProject,
        };
      } catch (err) {
        console.log(err);
        return {
          code: err.code || 500,
          success: false,
          message: err.type || 'ERROR',
          project: null,
        };
      }
    },
    updateUser: (parent, args, { prisma }) => {
      const { userId, user } = args;
      const { id, emailVerified, createdAt, updatedAt, ...userData } = user;

      return prisma.user
        .update({
          where: {
            id: +userId,
          },
          data: { ...userData },
        })
        .then((updatedUser) => ({
          code: 200,
          success: true,
          message: 'USER_UPDATED',
          user: updatedUser,
        }))
        .catch(() => ({
          code: 500,
          success: false,
          message: 'ERROR',
          user,
        }));
    },
    deleteToken: async (parent, { id }, { prisma }) => {
      const deleteToken = await prisma.userTokens.delete({
        where: {
          id: +id,
        },
      });

      if (deleteToken) {
        return {
          code: 200,
          success: true,
          message: 'DELETED',
        };
      }
      return {
        code: 500,
        success: false,
        message: 'ERROR',
      };
    },
    deleteProfile: async (parent, { id }, { prisma }) => {
      try {
        let imageIds = [];
        const projectsId = await prisma.project.findMany({
          where: { userId: +id },
          select: { id: true },
        });

        if (projectsId.length > 0) {
          imageIds = await prisma.image.findMany({
            where: {
              projectId: {
                in: projectsId.map((p) => p.id),
              },
            },
            select: {
              imageUrl: true,
              id: true,
            },
          });
        }
        const cant = await prisma.$executeRaw(`DELETE FROM users WHERE users.id = ${+id};`);
        if (imageIds.length > 0 && cant === 1) {
          deleteImagesPromise(imageIds.map((i) => getPublicIdFromImageUrl(i.imageUrl)));
        }

        return {
          code: 200,
          success: true,
          message: 'DELETED',
        };
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: 'ERROR',
        };
      }
    },
    deleteProject: async (parent, { id }, { prisma }) => {
      try {
        const imageIds = await prisma.image.findMany({
          where: {
            projectId: +id,
          },
          select: {
            imageUrl: true,
            id: true,
          },
        });

        const cant = await prisma.$executeRaw(`DELETE FROM projects WHERE projects.id = ${+id};`);
        if (imageIds.length > 0 && cant === 1) {
          deleteImagesPromise(imageIds.map((i) => getPublicIdFromImageUrl(i.imageUrl)));
        }

        return {
          code: 200,
          success: true,
          message: 'DELETED',
        };
      } catch (err) {
        console.log(err);
        return {
          code: 500,
          success: false,
          message: 'ERROR',
        };
      }
    },
    changeProjectVisibility: async (parent, { id, visibility }, { prisma }) =>
      prisma.project
        .update({
          where: {
            id: +id,
          },
          data: {
            publicProject: visibility,
          },
        })
        .then((updatedProject) => ({
          code: 200,
          success: true,
          message: 'USER_UPDATED',
          project: updatedProject,
        }))
        .catch(() => ({
          code: 500,
          success: false,
          message: 'ERROR',
        })),
  },
  User: {
    projects: (user, args, { prisma }) =>
      prisma.project.findMany({
        where: {
          userId: user.id,
        },
      }),
  },
  Project: {
    initialDate: (project) =>
      project.initialDate ? new Date(project.initialDate).getTime() : null,
    finalDate: (project) => (project.finalDate ? new Date(project.finalDate).getTime() : null),
    skills: (project, args, { prisma }) =>
      prisma.skill.findMany({
        where: {
          projects: {
            some: {
              projectId: project.id,
            },
          },
        },
      }),
    images: (project, args, { prisma }) =>
      prisma.image.findMany({
        where: {
          projectId: {
            equals: project.id,
          },
        },
      }),
    collaborators: (project, args, { prisma }) =>
      prisma.collaborator.findMany({
        where: {
          projectId: {
            equals: project.id,
          },
        },
      }),
    slug: async (project, args, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: project.userId,
        },
        select: {
          slug: true,
        },
      });
      return user.slug;
    },
  },
  DevProviderRepo: {
    ownerId: (repo) => {
      switch (repo.provider) {
        case 'github':
        case 'gitlab':
          return repo.owner.id;
        default:
          return null;
      }
    },
    ownerLogin: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.owner.login;
        case 'gitlab':
          return repo.owner.username;
        default:
          return null;
      }
    },
    ownerAvatarUrl: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.owner.avatarUrl;
        case 'gitlab':
          return repo.owner.avatar_url;
        default:
          return null;
      }
    },
    deploymentUrl: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.deployments.nodes.length > 0
            ? repo.deployments.nodes[0].latestStatus.environmentUrl
            : '';
        case 'gitlab':
          return repo.deploymentUrl;
        default:
          return null;
      }
    },
    languages: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.languages.nodes.length > 0
            ? repo.languages.nodes.map((lang) => lang.name)
            : [];
        case 'gitlab':
          return Object.keys(repo.languages);
        default:
          return null;
      }
    },
    topics: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.repositoryTopics.nodes.length > 0
            ? repo.repositoryTopics.nodes.map((node) => node.topic.name)
            : [];
        case 'gitlab':
          return repo.topics;
        default:
          return null;
      }
    },
    collaborators: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.mentionableUsers.nodes.length > 0
            ? repo.mentionableUsers.nodes.map((user) => ({
                ...user,
                ...(!user.name && { name: user.login }),
                isOwner: user.login === repo.owner.login,
              }))
            : [];
        case 'gitlab':
          return repo.collaborators && repo.collaborators.length > 0
            ? repo.collaborators.map((user) => ({
                login: user.username,
                avatarUrl: user.avatar_url,
                email: user.public_email,
                bio: user.job_title,
                name: user.name,
                url: user.web_url,
                isOwner: repo.owner.id === user.id,
              }))
            : [];
        default:
          return null;
      }
    },
    totalCollaborators: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.mentionableUsers.totalCount;
        case 'gitlab':
          return repo.totalCollaborators.length;
        default:
          return null;
      }
    },
  },
};

export default resolvers;
