import bcryptjs from 'bcryptjs';

import User from '../models/userModel.js';
import { createError } from '../utils/createError.js';
import { pickAllowedKeys } from '../utils/pickAllowedKeys.js';

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

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(createError(403, 'You are not allowed to update this user'));
  }

  if (req.body.password) {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    const isMatch = await bcryptjs.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
      return next(createError(403, 'Old password is incorrect'));
    }

    if (req.body.password.length < 8 || req.body.password.length > 64) {
      return next(createError(400, 'Password must be between 8 and 64 characters long.'));
    }

    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  const allowedUpdates = ['name', 'surname', 'dateofBirth', 'email', 'password'];
  const updates = pickAllowedKeys(req.body, allowedUpdates);

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: updates }, { new: true, runValidators: true, context: 'query' });

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(createError(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export { getUsers, updateUser, deleteUser };
