/* eslint-disable import/prefer-default-export */
// Escapa cadenas de string. Por ejemplo: String.search(strParam) puede recibir un string o una RegExp, pero si le pasas el string "c++" lo toma como RegExp y da error por no estar bien construida.
// Para solucionarlo escapas la cadena con esta funcion y todo funciona perfecto
export const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
