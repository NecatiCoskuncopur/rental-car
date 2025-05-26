import express from 'express';

import { upload } from '../utils/multer.js';
import { verifyUser } from '../middlewares/verifyUser.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', verifyUser, upload.single('image'), uploadImage);

export default router;
