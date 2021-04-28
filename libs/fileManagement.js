import cloudinary from './integrations/cloudinary';

const streamifier = require('streamifier');

const uploadFileToCloudinary = async (imageBuffer) => {
  try {
    const url = await new Promise((resolve, reject) => {
      streamifier.createReadStream(imageBuffer).pipe(
        cloudinary.uploader.upload_stream(
          {
            folder: process.env.NEXT_PUBLIC_CLOUDINARY_IMG_FOLDER,
          },
          (error, result) => {
            if (result) resolve(result.url);
            if (error) reject(error);
          }
        )
      );
    });
    return url;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const saveFile = async (file) => uploadFileToCloudinary(file.buffer);

const deleteFileFromCloudinary = async (path) => {
  try {
    const publicId = path.split('/').pop().split('.')[0];
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_IMG_FOLDER}/${publicId}`,
        (error, result) => {
          if (error) reject(error);
          if (result) resolve(result);
        }
      );
    });

    if (res.result !== 'ok') throw new Error('ERROR_DELETING_IMG');
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteFile = async (path) => deleteFileFromCloudinary(path);
