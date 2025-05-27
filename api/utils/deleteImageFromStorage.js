import { getStorage } from 'firebase-admin/storage';

export const deleteImageFromStorage = async (imageUrl) => {
  try {
    const bucket = getStorage().bucket();

    const decodedUrl = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
    const file = bucket.file(decodedUrl);

    await file.delete();
  } catch (error) {
    console.error('Error deleting image from Firebase Storage:', error);
    throw new Error('Failed to delete image from Firebase Storage');
  }
};
