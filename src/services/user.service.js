import connection from '../db/index.js';
import bcrypt from 'bcrypt';

/**
 * Retrieves a user from the database based on the provided email.
 *
 * @param {Object} options - The options object.
 * @param {string} options.email - The email of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
async function getOneUserByEmail({ email }) {
  const conn = await connection();
  const user = await conn
    .request()
    .input('email', email.trim().toLowerCase())
    .query('SELECT * FROM users WHERE email = @email');

  return user.recordset[0];
}

/**
 * Retrieves a single user by their ID.
 *
 * @param {Object} params - The parameters for retrieving the user.
 * @param {number} params.userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
async function getOneUserById({ userId }) {
  const conn = await connection();
  const user = await conn.request().input('id', userId).query('SELECT * FROM users WHERE id = @id');

  return user.recordset[0];
}

/**
 * Creates a new user in the database.
 * @param {Object} options - The options for creating a user.
 * @param {Object} options.body - The user data including name, email, and password.
 * @param {string} options.body.name - The name of the user.
 * @param {string} options.body.email - The email of the user.
 * @param {string} options.body.password - The password of the user.
 * @returns {Object} The created user object.
 * @throws {Object} If the email is already registered, throws an error with status code 409 and message 'EMAIL_ALREADY_REGISTERED'.
 */
async function createUser({ body }) {
  const conn = await connection();
  const { name, email, password } = body;

  if (await getOneUserByEmail({ email }))
    throw {
      statusCode: 409,
      message: 'EMAIL_ALREADY_REGISTERED',
    };

  const created = await conn
    .request()
    .input('name', name.trim())
    .input('email', email.trim().toLowerCase())
    .input('password', password)
    .query('INSERT INTO users (name, email, password) OUTPUT INSERTED.id VALUES (@name, @email, @password)');

  const user = {
    id: created.recordset[0].id,
    name,
    email,
  };

  return user;
}

/**
 * Updates a user in the database.
 * @param {Object} options - The options for updating the user.
 * @param {number} options.userId - The ID of the user to update.
 * @param {Object} options.body - The updated user data.
 * @param {string} options.body.name - The updated name of the user.
 * @param {string} options.body.password - The updated password of the user.
 * @returns {Object} - The updated user object.
 */
async function updateUser({ userId, body }) {
  const conn = await connection();
  const { name, password } = body;

  const oldUser = await getOneUserById({ userId });

  const updated = await conn
    .request()
    .input('id', userId)
    .input('name', name || oldUser.name)
    .input('password', password ? await bcrypt.hash(password, 10) : oldUser.password)
    .query('UPDATE users SET name = @name, password = @password OUTPUT INSERTED.* WHERE id = @id');

  const userUpdated = {
    id: userId,
    name,
    email: updated.recordset[0].email,
  };

  return userUpdated;
}

export default {
  getOneUserByEmail,
  createUser,
  updateUser,
};
