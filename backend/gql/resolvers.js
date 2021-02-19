import prisma from '../../prisma/prisma.instance';
import SkillCatergories from '../../constants/skillsCategorysConst';
import saveFile from '../../libs/saveFile';
import getPreviewData from '../../libs/metascraper';

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
    projects: (parent, args) =>
      prisma.project.findMany({
        where: { ...args },
      }),
    skills: (parent, args) =>
      prisma.skill.findMany({
        where: { ...args },
      }),
    link: (parent, args) => {
      const { url } = args;
      return prisma.link
        .findFirst({
          where: {
            url,
          },
        })
        .then((link) => {
          if (link) {
            return {
              ...link,
              img: link.imageUrl,
            };
          }
          return getPreviewData(url);
        })
        .catch((err) => console.log(err));
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
    singleUpload: (parent, args) =>
      args.file.then((file) => {
        // Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
        // file.createReadStream() is a readable node stream that contains the contents of the uploaded file
        // node stream api: https://nodejs.org/api/stream.html
        // file
        saveFile(file)
          .then((url) =>
            prisma.image.create({
              data: {
                imageUrl: url,
              },
            })
          )
          .then((image) => image.id);
      }),
    createProject: async (parent, args) => {
      try {
        const { project } = args;
        // const { skills } = project;
        const { projectLink, projectDevLink, skills, imageIds } = project;

        let skillIds = null;
        let createdProjectLink = null;
        let createdProjectDevLink = null;
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

        if (projectLink && projectLink.url) {
          createdProjectLink = await prisma.link.create({
            data: { ...projectLink },
          });
        }
        if (projectDevLink && projectDevLink.url) {
          createdProjectDevLink = await prisma.link.create({
            data: { ...projectDevLink },
          });
        }

        const createdProject = await prisma.project.create({
          data: {
            userId: +project.userId,
            name: project.name,
            description: project.description,
            initialDate: iniDate,
            finalDate: endDate,
            otherInfo: project.otherInfo,
            projectLinkId: createdProjectLink && createdProjectLink.id,
            projectDevLinkId: createdProjectDevLink && createdProjectDevLink.id,
            skills: {
              create: skillIds.map((skill) => ({
                skillId: skill,
              })),
            },
            ...(imageIds &&
              imageIds.length > 0 && {
                images: {
                  connect: imageIds.map((imgId) => ({ id: +imgId })),
                },
              }),
          },
        });

        return {
          code: 201,
          success: true,
          message: 'PROJECT_CREATED',
          project: createdProject,
        };
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: 'ERROR',
          project: null,
        };
      }
    },
    updateProject: (parent, args) => {
      const { projectId, project } = args;
      const { id, userId, ...projectData } = project;

      return prisma.project
        .update({
          where: {
            id: +projectId,
          },
          data: { ...projectData },
        })
        .then((updatedProject) => ({
          code: 200,
          success: true,
          message: 'PROJECT_UPDATED',
          project: updatedProject,
        }))
        .catch(() => ({
          code: 500,
          success: false,
          message: 'ERROR',
          project,
        }));
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
    projectLink: (project) =>
      project.projectLinkId
        ? prisma.link.findUnique({
            where: {
              id: project.projectLinkId,
            },
          })
        : null,
    projectDevLink: (project) =>
      project.projectDevLinkId
        ? prisma.link.findUnique({
            where: {
              id: project.projectDevLinkId,
            },
          })
        : null,
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
  },
};

export default resolvers;