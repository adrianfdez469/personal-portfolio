import got from 'got';

const metascraperFn = require('metascraper');
const metascraperTitleFn = require('metascraper-title');
const metascraperDescriptionFn = require('metascraper-description');
const metascraperLogoFn = require('metascraper-logo');
const metascraperLogoFaviconFn = require('metascraper-logo-favicon');
const metascraperImageFn = require('metascraper-image');

const metascraper = metascraperFn([
  metascraperTitleFn(),
  metascraperDescriptionFn(),
  metascraperLogoFn(),
  metascraperLogoFaviconFn(),
  metascraperImageFn(),
]);

const getPreviewData = async (targetUrl) => {
  try {
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({ html, url });

    const data = {
      ...(metadata.title && { title: metadata.title.slice(0, 50) }),
      ...(metadata.description && {
        description: `${metadata.description.slice(0, 250)}${
          metadata.description.length > 250 ? '...' : ''
        }`,
      }),
      // img: metadata.logo || metadata.image,
      id: -1,
      url,
      imageUrl: metadata.logo || metadata.image,
    };
    return data;
  } catch (error) {
    error.message = 'Error while getting the preview data';
    throw error;
  }
};

export default getPreviewData;
