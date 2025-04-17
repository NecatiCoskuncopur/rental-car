import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser || !bcryptjs.compareSync(password, validUser.password)) {
      return next(createError(404, 'Invalid email or password!'));
    }

    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;
    res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .clearCookie('access_token', {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'User has been signed out' });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout };
