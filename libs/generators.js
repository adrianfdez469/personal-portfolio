import limax from 'limax';
import createUuid from 'uuid-v4';

export const generateHash = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const getSlug = (text) => limax(text || '');

export const getHashSlug = (text) => `${text ? `${getSlug(text)}-` : ''}${generateHash()}`;

export const generateUuid = () => createUuid();
