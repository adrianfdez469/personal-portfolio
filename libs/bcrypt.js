import bcrypt from 'bcryptjs';

export const generateHash = (text) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};

export const checkHash = (text, hash) => bcrypt.compareSync(text, hash);
