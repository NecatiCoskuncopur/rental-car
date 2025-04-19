import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router();

router.get('/getVehicles', (req, res) => {});

router.post('/createVehicle', verifyUser, (req, res) => {});

router.put('/updateVehicle/:vehicleId', verifyUser, (req, res) => {});

router.delete('/deleteVehicle/:vehicleId', verifyUser, (req, res) => {});

export default router;
