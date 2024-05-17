import bcrypt from 'bcrypt';
import userService from './user.service.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

/**
 * Sign up a new user.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.body - The user data.
 * @returns {Object} - The user object and access token.
 */
async function signUp({ body }) {
  const { password } = body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userService.createUser({
    body: {
      ...body,
      password: passwordHash,
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    accessToken: generateToken(user),
  };
}

/**
 * Logs in a user with the provided email and password.
 * @param {Object} options - The options object.
 * @param {Object} options.body - The request body containing the email and password.
 * @returns {Object} - An object containing the user information and access token.
 * @throws {Object} - If the email or password is invalid.
 */
async function logIn({ body }) {
  const { email, password } = body;

  const user = await userService.getOneUserByEmail({ email });
  if (!user) throw { statusCode: 401, message: 'EMAIL_INVALID' };

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw { statusCode: 401, message: 'PASSWORD_INVALID' };

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    accessToken: generateToken(user),
  };
}

function generateToken(user) {
  return jwt.sign({ sub: user.id }, config.auth.accessSecret, {
    expiresIn: '1h',
  });
}

export default {
  signUp,
  logIn,
};
