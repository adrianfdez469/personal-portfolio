import cloudinary from './integrations/cloudinary';

const streamifier = require('streamifier');
const fs = require('fs');

const getLocalFileUrl = (image) => `${image.destination}/${image.originalname}`;

const uploadFileToCloudinary = async (imageBuffer) => {
  try {
    const url = await new Promise((resolve, reject) => {
      streamifier.createReadStream(imageBuffer).pipe(
        cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result.url);
          }
          if (error) {
            reject(error);
          }
        })
      );
    });
    return url;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const saveFile = async (file) => {
  if (process.env.NODE_ENV === 'development') {
    const url = getLocalFileUrl(file);
    const imgUrl = `${process.env.NEXTAUTH_URL}${url.split('./public')[1]}`;
    return imgUrl;
  }

  const imageUrl = await uploadFileToCloudinary(file.buffer);
  return imageUrl;
};

const deleteLocalFile = async (path) => {
  const pathSlices = path.split('/');
  const name = pathSlices.slice(-1);
  return fs.promises.unlink(`./public/uploads/${name}`).then(() => true);
};

const deleteFileFromCloudinary = async (path) => {
  try {
    const publicId = path.split('/').pop().split('.')[0];
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        if (result) resolve(result);
      });
    });

    if (res.result !== 'ok') throw new Error('ERROR_DELETING_IMG');
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteFile = async (path) => {
  if (process.env.NODE_ENV === 'development') {
    return deleteLocalFile(path);
  }
  return deleteFileFromCloudinary(path);
};
