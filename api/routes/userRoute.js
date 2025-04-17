import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { getUsers, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/getUsers', verifyUser, getUsers);

router.put('/updateUser/:userId', verifyUser, updateUser);

router.delete('/deleteUser/:userId', verifyUser, (req, res) => {});

export default router;
