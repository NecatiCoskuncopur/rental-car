import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { getMonthlyIncome, getYearlyIncome } from '../controllers/incomeController.js';

const router = express.Router();

router.get('/monthly', verifyUser, getMonthlyIncome);

router.get('/yearly', verifyUser, getYearlyIncome);

export default router;
