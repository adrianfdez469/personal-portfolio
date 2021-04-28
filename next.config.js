module.exports = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dkaifybbg',
  },
};
