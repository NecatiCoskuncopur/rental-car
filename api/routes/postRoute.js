import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { getPosts } from '../controllers/postController.js';

const router = express.Router();

router.get('/getPosts', getPosts);

router.post('/createPost', verifyUser, (req, res) => {});

router.put('/updatePost/:postId', verifyUser, (req, res) => {});

router.delete('/deletePost/:postId', verifyUser, (req, res) => {});

export default router;
