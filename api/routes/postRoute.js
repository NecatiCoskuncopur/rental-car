import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { createPost, deletePost, getAdjacentPosts, getPost, getPosts, getSlugs, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.get('/getPosts', getPosts);

router.get('/getPost/:slug', getPost);

router.get('/getSlugs', getSlugs);

router.get('/getAdjacentPosts/:slug', getAdjacentPosts);

router.post('/createPost', verifyUser, createPost);

router.put('/updatePost/:postId', verifyUser, updatePost);

router.delete('/deletePost/:postId', verifyUser, deletePost);

export default router;
