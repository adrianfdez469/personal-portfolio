// Esiste objeto con propiedad y valor determinados
// eslint-disable-next-line import/prefer-default-export
export const existsObjWithPropValue = (arrObj, prop, value) =>
  arrObj.findIndex((obj) => obj[prop] === value) > -1;
