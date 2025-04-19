import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { createBooking, getBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/getBookings', verifyUser, getBookings);

router.post('/createBooking', verifyUser, createBooking);

router.put('/updateBooking/:bookingId', verifyUser, (req, res) => {});

export default router;
