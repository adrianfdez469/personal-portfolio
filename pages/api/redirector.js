import { getSession } from 'next-auth/client';

const getUserId = async (req) => {
  const { userId } = await getSession({ req });
  return userId;
};

const proxyUrlPage = async (redirectTo, req) => {
  switch (redirectTo) {
    case 'EDIT_USER': {
      const userId = await getUserId(req);
      return `${process.env.NEXTAUTH_URL}/profile/${userId}`;
    }

    default:
      return '';
  }
};

const handler = async (req, res) => {
  const { redirect_to: redirectTo } = req.query;

  const url = await proxyUrlPage(redirectTo, req);
  res.status(301);
  res.redirect(url);
};

export default handler;
