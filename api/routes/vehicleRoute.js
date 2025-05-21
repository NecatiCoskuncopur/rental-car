import express from 'express';

import { verifyUser } from '../middlewares/verifyUser.js';
import { createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/getVehicles', getVehicles);

router.get('/getVehicle/:id', getVehicle);

router.post('/createVehicle', verifyUser, createVehicle);

router.put('/updateVehicle/:vehicleId', verifyUser, updateVehicle);

router.delete('/deleteVehicle/:vehicleId', verifyUser, deleteVehicle);

export default router;
