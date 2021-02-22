import { generateHash, generateUuid } from './generators';
import firebaseAdmin from './firebaseAdmin';

const fs = require('fs');

const getLocalFileUrl = (image) => `${image.destination}/${image.originalname}`;

// set the Firebase metadata with the downloadToken
const setFirebaseMetadata = async (fileRef) => {
  const downloadToken = generateUuid();
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: downloadToken,
    },
  };

  await fileRef.setMetadata(metadata);

  return downloadToken;
}; // setFirebaseMetadata

// build the downloadURL using the file infomation; adds the download token if it doesn't exists
const getDownloadURL = async (fileRef) => {
  const bucket = fileRef.bucket.name;
  const [metadata] = await fileRef.getMetadata();
  let downloadToken;

  if (!metadata.metadata) {
    downloadToken = await setFirebaseMetadata(fileRef);
  } else {
    [downloadToken] = metadata.metadata.firebaseStorageDownloadTokens.split(',');
  }

  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    fileRef.name
  )}?alt=media&token=${downloadToken}`;

  return url;
}; // getDownloadURL

const uploadFileToCloud = async (image) => {
  const imageTempPath = getLocalFileUrl(image);
  const bucket = firebaseAdmin.storage().bucket();
  const url = await new Promise((resolve, reject) => {
    bucket.upload(
      imageTempPath,
      {
        destination: `${generateHash()}-${image.originalname}`,
        gzip: false,
      },
      (err, file) => {
        if (!err) {
          getDownloadURL(file).then((fileUrl) => {
            resolve(fileUrl);
          });
        } else {
          reject(err);
        }
      }
    );
  }).then((imageUrl) => {
    fs.promises.unlink(imageTempPath);
    return imageUrl;
  });

  return url;
};

export const saveFile = async (file) => {
  if (process.env.NODE_ENV === 'development') {
    const url = getLocalFileUrl(file);
    const imgUrl = `${process.env.NEXTAUTH_URL}${url.split('./public')[1]}`;
    return imgUrl;
  }
  const imageUrl = await uploadFileToCloud(file);
  return imageUrl;
};

const deleteLocalFile = async (path) => {
  const pathSlices = path.split('/');
  const name = pathSlices.slice(-1);
  return fs.promises.unlink(`./public/uploads/${name}`).then(() => true);
};

const deleteFileFromCluod = async (path) => {
  const bucket = firebaseAdmin.storage().bucket();
  const filePath = path
    .split(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/`)[1]
    .split('?')[0];
  const file = bucket.file(filePath);
  return file.delete().then(() => true);
};

export const deleteFile = async (path) => {
  if (process.env.NODE_ENV === 'development') {
    return deleteLocalFile(path);
  }
  return deleteFileFromCluod(path);
};
