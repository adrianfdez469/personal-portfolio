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
      title: metadata.title,
      description: metadata.description,
      img: metadata.logo || metadata.image,
    };

    return data;
  } catch (error) {
    error.message = 'Error while getting the preview data';
    throw error;
  }
};

export default async (req, res) => {
  const { url } = JSON.parse(req.body);

  try {
    const data = await getPreviewData(url);
    const compactedData = {
      ...data,
      ...(data.title && { title: data.title.slice(0, 35) }),
      ...(data.description && { description: data.description.slice(0, 150) }),
    };

    res.status(200).json({ data: compactedData });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
