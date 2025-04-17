import bcryptjs from 'bcryptjs';

import User from '../models/userModel.js';
import { createError } from '../utils/createError.js';

const register = async (req, res, next) => {
  const { name, surname, dateofBirth, email, password } = req.body;

  if (password.length < 8 || password.length > 64) {
    return next(createError(400, 'Password must be between 8 and 64 characters long.'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    name,
    surname,
    dateofBirth,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Registration Successfull');
  } catch (error) {
    next(error);
  }
};

export { register };
