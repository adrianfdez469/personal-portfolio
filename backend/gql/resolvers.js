import { getSession } from 'next-auth/client';
import prisma from '../../prisma/prisma.instance';
import SkillCatergories from '../../constants/skillsCategorysConst';
import getPreviewData from '../../libs/metascraper';
import ProxyProvider from '../../libs/integrations/provider.proxy';

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
    user: (parent, args) =>
      prisma.user.findUnique({
        where: {
          id: +args.id,
        },
      }),
    projects: (parent, args) =>
      prisma.project.findMany({
        where: { ...args },
      }),
    skills: (parent, args) =>
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
      return provider.getRepoData(context);
    },
    providerUserData: async (parent, args, context) => {
      const provider = ProxyProvider(args.provider);
      return provider.getUserData(context);
    },
  },
  Mutation: {
    createSkill: (parent, args) => {
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
        const { projectLink, projectDevLink, skills, images, logoUrl } = project;

        let skillIds = null;
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
                    prisma.skill
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
                          prisma.skill
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
        const savedProject = await prisma.project.upsert({
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
            logoUrl,
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
            logoUrl,
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
          code: 500,
          success: false,
          message: 'ERROR',
          project: null,
        };
      }
    },
    updateUser: (parent, args) => {
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
  },
  User: {
    projects: (user) =>
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
    skills: (project) =>
      prisma.skill.findMany({
        where: {
          projects: {
            some: {
              projectId: project.id,
            },
          },
        },
      }),
    images: (project) =>
      prisma.image.findMany({
        where: {
          projectId: {
            equals: project.id,
          },
        },
      }),
  },
  DevProviderRepo: {
    ownerId: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.owner.id;
        case 'gitlab':
        default:
          return null;
      }
    },
    ownerLogin: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.owner.login;
        case 'gitlab':
        default:
          return null;
      }
    },
    ownerAvatarUrl: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.owner.avatarUrl;
        case 'gitlab':
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
        default:
          return null;
      }
    },
    totalCollaborators: (repo) => {
      switch (repo.provider) {
        case 'github':
          return repo.mentionableUsers.totalCount;
        case 'gitlab':
        default:
          return null;
      }
    },
  },
};

export default resolvers;
