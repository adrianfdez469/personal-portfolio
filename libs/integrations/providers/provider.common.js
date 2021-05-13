import { getSession } from 'next-auth/client';

export const findEnhanceToken = async (userId, prisma, provider) => {
  const userToken = await prisma.userTokens.findUnique({
    where: {
      userId_provider: {
        provider,
        userId,
      },
    },
  });
  if (userToken) return userToken.accessToken;
  return null;
};

export const deleteUserToken = async (context, provider) => {
  const session = await getSession(context);

  if (!session) {
    throw new Error('NO_SESSION');
  }
  return context.prisma.userTokens.delete({
    where: {
      userId_provider: {
        provider,
        userId: session.userId,
      },
    },
  });
};
