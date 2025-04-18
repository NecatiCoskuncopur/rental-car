import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { createPost, deletePost, getPosts, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.get('/getPosts', getPosts);

router.post('/createPost', verifyUser, createPost);

router.put('/updatePost/:postId', verifyUser, updatePost);

router.delete('/deletePost/:postId', verifyUser, deletePost);

export default router;
