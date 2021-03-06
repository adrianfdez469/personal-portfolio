import { respGithubMiddleware } from '../../../libs/integrations/github.provider';

const handler = async (req, res) => {
  const { code, state, provider } = req.query;

  /// const stateObj = JSON.parse(state);

  if (provider === 'github') {
    // TODO: hacer esto en el github.provider
    await respGithubMiddleware(req, res, code, state);
    return;
  }
  if (provider === 'gitlab') {
    console.log('Not implemented!!!');
  }
  res.writeHead(301, {
    Location: `${process.env.NEXTAUTH_URL}`,
  });
  res.end();
};

export default handler;
