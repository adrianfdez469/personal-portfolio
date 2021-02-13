import limax from 'limax';

export const getSlug = (text) => limax(text);
export const getHashSlug = (text) => {
  const hash =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `${text ? `${getSlug(text)}-` : ''}${hash}`;
};
