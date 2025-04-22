import Booking from '../models/bookingModel.js';
import Vehicle from '../models/vehicleModel.js';
import { createError } from '../utils/createError.js';

const getBookings = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'You are not allowed to see bookings'));
  }

  try {
    const { limit = 10, page = 1, order = 'desc', status } = req.query;
    const queryConditions = {};
    if (status) queryConditions.status = status;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { updatedAt: order === 'asc' ? 1 : -1 },
      populate: ['vehicle', 'user'],
      customLabels: {
        totalDocs: 'totalBookings',
        docs: 'bookings',
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

    const result = await Booking.paginate(queryConditions, options);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createBooking = async (req, res, next) => {
  const { vehicleId, startDate, endDate } = req.body;
  const userId = req.user.id;

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return next(createError(404, 'Vehicle not found'));
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return next(createError(400, 'Invalid date format'));
    }

    if (end <= start) {
      return next(createError(400, 'End date must be later than start date'));
    }

    const overlappingBookings = await Booking.find({
      vehicle: vehicleId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start },
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      return next(createError(400, 'The vehicle is already booked for the selected dates.'));
    }

    const dayDifference = Math.ceil((end - start) / (1000 * 3600 * 24));
    const totalPrice = vehicle.price * dayDifference;

    const newBooking = new Booking({
      user: userId,
      vehicle: vehicleId,
      startDate,
      endDate,
      totalPrice,
      status: 'pending',
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  const { status } = req.body;
  const { bookingId } = req.params;
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;
  const validStatuses = ['confirmed', 'cancelled'];

  if (!status || !validStatuses.includes(status)) {
    return next(createError(400, 'Invalid status value. Must be "confirmed" or "cancelled"'));
  }

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return next(createError(404, 'Booking not found'));
    }

    const isOwner = String(booking.user?._id || booking.user) === String(userId);
    const isBookingPast = new Date(booking.startDate) <= new Date();

    if (isBookingPast) {
      return next(createError(403, 'You cannot update a booking that has already started or is in the past.'));
    }

    if (isAdmin) {
      const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { $set: { status } }, { new: true });
      return res.status(200).json(updatedBooking);
    }

    if (isOwner && status === 'cancelled') {
      const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { $set: { status: 'cancelled' } }, { new: true });
      return res.status(200).json(updatedBooking);
    }

    return next(createError(403, 'You are not allowed to update this booking'));
  } catch (error) {
    next(error);
  }
};

export { getBookings, createBooking, updateBooking };
