// eslint-disable-next-line import/prefer-default-export
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
