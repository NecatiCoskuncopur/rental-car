import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { getMonthlyIncome } from '../controllers/incomeController.js';

const router = express.Router();

router.get('/monthly', verifyUser, getMonthlyIncome);

router.get('/yearly', verifyUser, (req, res) => {});

export default router;
