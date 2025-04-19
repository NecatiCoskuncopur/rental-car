import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { getVehicles } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/getVehicles', getVehicles);

router.post('/createVehicle', verifyUser, (req, res) => {});

router.put('/updateVehicle/:vehicleId', verifyUser, (req, res) => {});

router.delete('/deleteVehicle/:vehicleId', verifyUser, (req, res) => {});

export default router;
