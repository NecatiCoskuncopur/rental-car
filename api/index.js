import './cron/autoCancelBookings.js';
import express from 'express';
import cookieParser from 'cookie-parser';

import { db } from './config/db.js';
import { config } from './config/config.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoute from './routes/authRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import incomeRoute from './routes/incomeRoute.js';
import postRoute from './routes/postRoute.js';
import userRoute from './routes/userRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import vehicleRoute from './routes/vehicleRoute.js';

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

db();

app.use('/api/auth', authRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/income', incomeRoute);
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/vehicle', vehicleRoute);

app.use(errorHandler);

app.get('/health', (_, res) => {
  res.status(200).send();
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
