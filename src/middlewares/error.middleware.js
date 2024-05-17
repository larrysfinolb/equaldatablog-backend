/**
 * Middleware function to handle errors.
 *
 * @param {Error} error - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export function errorMiddleware(error, req, res, next) {
  if (error.statusCode) {
    const { statusCode, message } = error;
    res.status(statusCode).json({ error: message });
  } else {
    const { stack } = error;
    res.status(500).json({ error: stack });
  }
}
