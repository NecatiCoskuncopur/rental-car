import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { deleteUser, getUserBooking, getUsers, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/getUsers', verifyUser, getUsers);

router.get('/getUser/bookings', verifyUser, getUserBooking);

router.put('/updateUser/:userId', verifyUser, updateUser);

router.delete('/deleteUser/:userId', verifyUser, deleteUser);

export default router;
