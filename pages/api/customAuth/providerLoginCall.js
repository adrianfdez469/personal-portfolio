import { getGithubLoginPageUrl } from '../../../libs/integrations/github.provider';

const handler = async (req, res) => {
  const { provider, showRepos } = req.query;
  if (provider === 'github') {
    const url = getGithubLoginPageUrl(showRepos);
    res.status(301);
    res.redirect(url);
  } else {
    res.status(200).json({});
  }
};

export default handler;
