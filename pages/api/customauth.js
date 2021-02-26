import { getSession } from 'next-auth/client';
import prisma from '../../prisma/prisma.instance';

const handler = async (req, res) => {
  const { code, state } = req.query;
  const session = await getSession({ req });

  if (state === 'github') {
    // TODO: hacer esto en el github.provider

    const response = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}&state=${state}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      // Error
    }
    const accessToken = await response.json();
    await prisma.userTokens.upsert({
      where: {
        userId_provider: {
          provider: state,
          userId: session.userId,
        },
      },
      create: {
        accessToken: accessToken.access_token,
        provider: state,
        userId: session.userId,
      },
      update: {
        accessToken: accessToken.access_token,
      },
    });

    res.writeHead(301, { Location: 'http://localhost:3000/profile/1/newproject' });
    res.end();
  }
  if (state === 'gitlab') {
    console.log('Not implemented!!!');
  }
};

export default handler;
