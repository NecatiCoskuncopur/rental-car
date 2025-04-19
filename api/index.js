import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';

import { db } from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoute from './routes/authRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import postRoute from './routes/postRoute.js';
import userRoute from './routes/userRoute.js';
import vehicleRoute from './routes/vehicleRoute.js';

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

db();

app.use('/api/auth', authRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);
app.use('/api/vehicle', vehicleRoute);

app.use(errorHandler);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
