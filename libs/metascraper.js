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
      title: metadata.title
        ? `${metadata.title.slice(0, 50)}${metadata.title.length > 50 ? '...' : ''}`
        : '',
      description: metadata.description
        ? `${metadata.description.slice(0, 250)}${metadata.description.length > 250 ? '...' : ''}`
        : '',
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
