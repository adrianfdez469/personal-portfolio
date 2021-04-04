// Esiste objeto con propiedad y valor determinados
// eslint-disable-next-line import/prefer-default-export
export const existsObjWithPropValue = (arrObj, prop, value) =>
  arrObj.findIndex((obj) => obj[prop] === value) > -1;

export const isStringValidUrl = (text) => /^(ftp|http|https):\/\/[^ "]+$/.test(text);

export const isStringEmpty = (text) => {
  if (text && text !== '') {
    return false;
  }
  return true;
};
