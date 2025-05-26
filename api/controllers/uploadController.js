import { v4 as uuidv4 } from 'uuid';

import { bucket } from '../config/firebaseAdmin.js';
import { createError } from '../utils/createError.js';

const uploadImage = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'Admin access required'));
  }

  try {
    if (!req.file) {
      return next(createError(400, 'No file uploaded'));
    }

    const image = req.file;
    const fileName = `${uuidv4()}_${image.originalname}`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });

    stream.on('error', (err) => {
      console.error(err);
      return next(createError(500, 'Upload failed'));
    });

    stream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      return res.status(200).json({ imageUrl: publicUrl });
    });

    stream.end(image.buffer);
  } catch (err) {
    next(err);
  }
};
``;

export { uploadImage };
