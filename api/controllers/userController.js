import User from '../models/userModel.js';
import { createError } from '../utils/createError.js';

const getUsers = async (req, res, next) => {
  if (!req.user?.isAdmin) {
    return next(createError(403, 'You are not allowed to see all users.'));
  }

  try {
    const { page = 1, limit = 10, order = 'desc' } = req.query;
    const queryConditions = {};

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { updatedAt: order === 'asc' ? 1 : -1 },
      lean: true,
      customLabels: {
        totalDocs: 'totalUsers',
        docs: 'users',
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

    const result = await User.paginate(queryConditions, options);
    result.users = result.users.map(({ password, ...rest }) => rest);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { getUsers };
