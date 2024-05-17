import connection from '../db/index.js';

/**
 * Retrieves all posts from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of post objects.
 */
async function getPosts() {
  const conn = await connection();

  const posts = await conn.request().query('SELECT * FROM posts');

  return posts.recordset;
}

/**
 * Retrieves a single post by its postId.
 *
 * @param {Object} options - The options object.
 * @param {number} options.postId - The ID of the post to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the retrieved post object.
 */
async function getOnePost({ postId }) {
  const conn = await connection();

  const post = await conn
    .request()
    .input('postId', postId)
    .query(
      'SELECT posts.*, users.name as userName FROM posts JOIN users ON posts.userId = users.id WHERE posts.id = @postId'
    );

  return post.recordset[0];
}

/**
 * Creates a new post.
 *
 * @param {Object} options - The options for creating a post.
 * @param {number} options.userId - The ID of the user creating the post.
 * @param {Object} options.body - The body of the post.
 * @param {string} options.body.title - The title of the post.
 * @param {string} options.body.article - The article of the post.
 * @returns {Object} The created post.
 */
async function createPost({ userId, body }) {
  const conn = await connection();
  const { title, article } = body;

  const created = await conn
    .request()
    .input('userId', userId)
    .input('title', title)
    .input('article', article)
    .query('INSERT INTO posts (title, article, userId) OUTPUT INSERTED.id VALUES (@title, @article, @userId)');

  const post = {
    id: created.recordset[0].id,
    userId,
    title,
    article,
  };

  return post;
}

export default {
  getPosts,
  getOnePost,
  createPost,
};
