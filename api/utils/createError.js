/**
 * Creates and returns an error object.
 * @param {number} statusCode - HTTP status code.
 * @param {string} message - Error message.
 * @returns {Error} Created error object.
 */

export const createError = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
