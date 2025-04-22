import mongoose from 'mongoose';
import { config } from './config.js';

export const db = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.mongoUri)
      .then(() => {
        console.log('DB Connected');
        return resolve(true);
      })
      .catch((error) => {
        console.error('DB Connection Error:', error);
        return reject(error);
      });
  });
};
