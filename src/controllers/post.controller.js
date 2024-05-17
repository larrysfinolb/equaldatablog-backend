import postService from '../services/post.service.js';

async function getPosts(req, res, next) {
  try {
    const data = await postService.getPosts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function getOnePost(req, res, next) {
  try {
    const { postId } = req.params;
    const data = await postService.getOnePost({ postId });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function createPost(req, res, next) {
  try {
    const { body, userId } = req;

    const data = await postService.createPost({ userId, body });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export default {
  getPosts,
  getOnePost,
  createPost,
};
