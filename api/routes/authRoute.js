import express from 'express';

import { register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', (req, res) => {});

router.get('/logout', (req, res) => {});

export default router;
