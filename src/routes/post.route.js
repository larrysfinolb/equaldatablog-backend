import { authJwtMiddleware } from '../middlewares/auth.middleware.js';
import { schemaMiddleware } from '../middlewares/schema.middleware.js';
import express from 'express';
import postController from '../controllers/post.controller.js';
import postSchema from '../schemas/post.schema.js';

const router = express.Router();

router.get('/', postController.getPosts);
router.post('/', authJwtMiddleware, schemaMiddleware(postSchema.schemaBodyCreate, 'body'), postController.createPost);
router.get('/:postId', schemaMiddleware(postSchema.schemaParams, 'params'), postController.getOnePost);

export default router;
