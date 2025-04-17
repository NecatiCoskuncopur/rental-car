import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
