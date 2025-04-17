/**
 * Middleware function to handle errors in Express applications.
 *
 * It sets the HTTP status code and sends a JSON response with the error details.
 * Defaults to status code 500 and a generic error message if none are provided.
 **/

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export default errorHandler;
