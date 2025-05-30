import Vehicle from '../models/vehicleModel.js';
import { createError } from '../utils/createError.js';
import { deleteImageFromStorage } from '../utils/deleteImageFromStorage.js';
import { pickAllowedKeys } from '../utils/pickAllowedKeys.js';

const getVehicles = async (req, res, next) => {
  try {
    const {
      sortBy = 'updatedAt',
      order = 'desc',
      page = 1,
      limit = 10,
      startDate,
      endDate,
      vehicleType,
      fuelType,
      transmissionType,
      minAge,
      passengers,
    } = req.query;

    const sortDirection = order === 'asc' ? 1 : -1;

    const query = {};

    if (vehicleType) {
      query.vehicleType = { $in: vehicleType.split(',') };
    }

    if (fuelType) {
      query.fuelType = fuelType;
    }

    if (transmissionType) {
      query.transmissionType = transmissionType;
    }

    if (minAge && !isNaN(parseInt(minAge))) {
      query.minAge = { $lte: parseInt(minAge) };
    }

    if (passengers && !isNaN(parseInt(passengers))) {
      query.passengers = { $lte: parseInt(passengers) };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const aggregatePipeline = [
      { $match: query },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'vehicle',
          as: 'bookings',
        },
      },
      {
        $addFields: {
          bookingsWithinRange: {
            $filter: {
              input: '$bookings',
              as: 'booking',
              cond: {
                $and: [
                  {
                    $or: [
                      {
                        $and: [{ $lt: ['$$booking.startDate', end] }, { $gt: ['$$booking.endDate', start] }],
                      },
                      {
                        $and: [{ $gte: ['$$booking.startDate', start] }, { $lte: ['$$booking.endDate', end] }],
                      },
                    ],
                  },
                  { $ne: ['$$booking.status', 'cancelled'] },
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          bookingsWithinRange: { $size: 0 },
        },
      },
      {
        $sort: {
          [sortBy]: sortDirection,
        },
      },
    ];

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      customLabels: {
        totalDocs: 'totalVehicles',
        docs: 'vehicles',
        limit: 'perPage',
        page: 'currentPage',
        totalPages: 'totalPages',
        nextPage: 'next',
        prevPage: 'prev',
        pagingCounter: 'pageStartIndex',
        hasPrevPage: 'hasPrev',
        hasNextPage: 'hasNext',
      },
    };

    const result = await Vehicle.aggregatePaginate(Vehicle.aggregate(aggregatePipeline), options);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return next(createError(404, 'Vehicle not found.'));
    }
    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};

const createVehicle = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'You are not allowed to create a vehicle'));
  }
  const { brand, model, price, image, vehicleType, doors, passengers, transmissionType, fuelType, minAge } = req.body;

  const vehicleData = {
    brand,
    model,
    price: Number(price),
    image,
    vehicleType,
    doors: Number(doors),
    passengers: Number(passengers),
    transmissionType,
    fuelType,
    minAge: Number(minAge),
  };

  try {
    const newVehicle = new Vehicle(vehicleData);
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    next(error);
  }
};

const updateVehicle = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'You are not allowed to update this vehicle'));
  }

  const allowedUpdates = ['brand', 'model', 'price', 'image', 'vehicleType', 'doors', 'passengers', 'transmissionType', 'fuelType', 'minAge'];
  const updates = pickAllowedKeys(req.body, allowedUpdates);

  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return next(createError(404, 'Vehicle not found'));
    }

    if (req.body.image && req.body.image !== vehicle.image) {
      await deleteImageFromStorage(vehicle.image);
    }

    if (!req.body.image) {
      delete updates.image;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.vehicleId, { $set: updates }, { new: true, runValidators: true, context: 'query' });

    res.status(200).json(updatedVehicle);
  } catch (error) {
    next(error);
  }
};

const deleteVehicle = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'You are not allowed to delete this vehicle'));
  }

  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return next(createError(404, 'Vehicle not found'));
    }

    if (vehicle.image) {
      await deleteImageFromStorage(vehicle.image);
    }

    await Vehicle.findByIdAndDelete(req.params.vehicleId);
    res.status(200).json('The vehicle has been deleted');
  } catch (error) {
    next(error);
  }
};

export { getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle };
