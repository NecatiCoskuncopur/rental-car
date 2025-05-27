import { getStorage } from 'firebase-admin/storage';

export const deleteImageFromStorage = async (imageUrl) => {
  try {
    const regex = /https:\/\/storage\.googleapis\.com\/[^\/]+\/(.+)/;
    const match = imageUrl.match(regex);

    if (!match || !match[1]) {
      throw new Error('File path could not be extracted from the URL.');
    }

    const decodedPath = decodeURIComponent(match[1]);
    const bucket = getStorage().bucket();
    const file = bucket.file(decodedPath);

    const [exists] = await file.exists();
    if (!exists) {
      console.warn('File not found:', decodedPath);
      return;
    }

    await file.delete();
    console.log('File successfully deleted:', decodedPath);
  } catch (error) {
    console.error('Firebase Storage file deletion error:', error);
    throw new Error('Firebase Storage file deletion failed: ' + error.message);
  }
};
