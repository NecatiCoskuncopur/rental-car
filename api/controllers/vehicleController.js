import Vehicle from '../models/vehicleModel.js';

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

export { getVehicles };
