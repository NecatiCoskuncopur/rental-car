import Booking from '../models/bookingModel.js';
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

export { getBookings };
