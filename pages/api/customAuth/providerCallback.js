import ProxyProvider from '../../../libs/integrations/provider.proxy';
import prisma from '../../../prisma/prisma.instance';

const handler = async (req, res) => {
  try {
    const { code, state, param } = req.query;
    const { provider, originalPath } = JSON.parse(param);
    const providerObj = ProxyProvider(provider);
    if (!providerObj) {
      res.writeHead(301, {
        Location: `${process.env.NEXTAUTH_URL}`,
      });
      res.end();
      return;
    }
    await providerObj.respMiddleware(req, res, code, state, originalPath, prisma);
  } catch (err) {
    console.log(err);
  }
};

export default handler;
