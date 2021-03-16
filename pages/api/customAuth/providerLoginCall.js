import ProxyProvider from '../../../libs/integrations/provider.proxy';

const handler = async (req, res) => {
  const { provider, ...restOfQuerys } = req.query;
  const providerObj = ProxyProvider(provider);
  if (!providerObj) {
    res.status(200).json({});
    return;
  }
  const url = providerObj.getLoginPageUrl(restOfQuerys);
  res.status(301);
  res.redirect(url);
};

export default handler;
