import admin from 'firebase-admin';

const serviceAccount =
  process.env.NODE_ENV === 'development' ? require('../../firebase.json') : process.env.FIREBASE;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export default admin;
