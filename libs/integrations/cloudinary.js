import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImagesPromise = (images) =>
  new Promise((resolve, reject) => {
    cloudinary.v2.api.delete_resources(images, (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });

export default cloudinary.v2;
