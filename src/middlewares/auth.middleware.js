import jwt from 'jsonwebtoken';
import config from '../config/index.js';

/**
 * Middleware function to authenticate JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Object} - Throws an error object if authentication fails.
 */
export function authJwtMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    const tokenFormat = token.split(' ')[1];

    if (!tokenFormat) throw { statusCode: 401, message: 'UNAUTHORIZED' };

    jwt.verify(tokenFormat, config.auth.accessSecret, (err, decoded) => {
      if (err) throw { statusCode: 401, message: 'INVALID_TOKEN' };

      req.userId = decoded.sub;

      next();
    });
  } catch (error) {
    next(error);
  }
}
