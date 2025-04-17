import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router();

router.get('/getUsers', verifyUser, (req, res) => {});

router.put('/updateUser/:userId', verifyUser, (req, res) => {});

router.delete('/deleteUser/:userId', verifyUser, (req, res) => {});

export default router;
