import Booking from '../models/bookingModel.js';

const getMonthlyIncome = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(createError(403, 'You are not allowed to see income'));
    }

    const monthlyIncome = await Booking.aggregate([
      {
        $match: {
          status: 'confirmed',
        },
      },
      {
        $project: {
          yearMonth: {
            $dateToString: { format: '%Y-%m', date: { $toDate: '$startDate' } },
          },
          totalPrice: 1,
        },
      },
      {
        $group: {
          _id: '$yearMonth',
          totalIncome: { $sum: '$totalPrice' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json(monthlyIncome);
  } catch (error) {
    next(error);
  }
};

export { getMonthlyIncome };
