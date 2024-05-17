import express from 'express';
import userController from '../controllers/user.controller.js';
import { authJwtMiddleware } from '../middlewares/auth.middleware.js';
import { schemaMiddleware } from '../middlewares/schema.middleware.js';
import userSchema from '../schemas/user.schema.js';

const router = express.Router();

router.patch('/', authJwtMiddleware, schemaMiddleware(userSchema.schemaBodyUpdate, 'body'), userController.updateUser);

export default router;
