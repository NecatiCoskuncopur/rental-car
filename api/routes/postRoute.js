import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { createPost, getPosts, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.get('/getPosts', getPosts);

router.post('/createPost', verifyUser, createPost);

router.put('/updatePost/:postId', verifyUser, updatePost);

router.delete('/deletePost/:postId', verifyUser, (req, res) => {});

export default router;
