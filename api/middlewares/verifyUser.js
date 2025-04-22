import jwt from 'jsonwebtoken';

import { createError } from '../utils/createError.js';
import { config } from '../config/config.js';

/**
 * Middleware function to verify a JSON Web Token (JWT) from cookies and check for admin privileges.
 *
 * This function checks for the presence of an access token in the request cookies.
 * If a token is present, it verifies the token using a secret key from the environment variables.
 * If the token is valid and the user has admin privileges, the decoded user information is attached
 * to the request object and the next middleware is called. If the token is missing, invalid, or the user
 * does not have admin privileges, an error is passed to the next error-handling middleware.
 */

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'Unauthorized'));
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return next(createError(401, 'Unauthorized'));
    }

    req.user = user;
    next();
  });
};
