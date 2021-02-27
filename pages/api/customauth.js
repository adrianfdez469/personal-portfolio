import { getSession } from 'next-auth/client';
import { saveGithubEnhanceToken } from '../../libs/integrations/github.provider';

const handler = async (req, res) => {
  const { code, state } = req.query;
  const session = await getSession({ req });

  if (state === 'github') {
    // TODO: hacer esto en el github.provider
    saveGithubEnhanceToken(session.userId, code, state);

    res.writeHead(301, {
      Location: `${process.env.NEXTAUTH_URL}/profile/${session.userId}/newproject`,
    });
    res.end();
  }
  if (state === 'gitlab') {
    console.log('Not implemented!!!');
  }
};

export default handler;
