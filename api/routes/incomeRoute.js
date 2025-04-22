import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router();

router.get('/monthly', verifyUser, (req, res) => {});

router.get('/yearly', verifyUser, (req, res) => {});

export default router;
