import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { getBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/getBookings', verifyUser, getBookings);

router.post('/createBooking', verifyUser, (req, res) => {});

router.put('/updateBooking/:bookingId', verifyUser, (req, res) => {});

export default router;
