// Esiste objeto con propiedad y valor determinados
// eslint-disable-next-line import/prefer-default-export
export const existsObjWithPropValue = (arrObj, prop, value) =>
  arrObj.findIndex((obj) => obj[prop] === value) > -1;

export const isStringValidUrl = (text) => /^(ftp|http|https):\/\/[^ "]+$/.test(text);

export const isStringEmpty = (text) => {
  if (text && text !== '' && text.toString().trim() !== '') {
    return false;
  }
  return true;
};

export const getPublicIdFromImageUrl = (url) => {
  if (url) {
    const arrPaths = url.split('/');
    const publicId = `${process.env.NEXT_PUBLIC_CLOUDINARY_IMG_FOLDER}/${arrPaths.pop()}`;
    return publicId;
  }
  return '';
};

export const providerImageLoader = ({ src, width, quality }) => {
  // github
  if (src.includes('github')) return `${src}&s=${(width * quality) / 100}`;
  // if (src.includes('gitlab')) return `${src}&size=${(width * quality) / 100}`;
  return src;
};

export const isEmail = (text) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text);
