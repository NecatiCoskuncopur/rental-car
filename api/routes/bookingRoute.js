import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router();

router.get('/getBookings', verifyUser, (req, res) => {});

router.post('/createBooking', verifyUser, (req, res) => {});

router.put('/updateBooking/:bookingId', verifyUser, (req, res) => {});

export default router;
