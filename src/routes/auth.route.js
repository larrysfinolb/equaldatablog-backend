import express from 'express';
import { schemaMiddleware } from '../middlewares/schema.middleware.js';
import authController from '../controllers/auth.controller.js';
import authSchema from '../schemas/auth.schema.js';

const router = express.Router();

router.post('/sign-up', schemaMiddleware(authSchema.schemaSignUp, 'body'), authController.signUp);
router.post('/log-in', schemaMiddleware(authSchema.schemaLogIn, 'body'), authController.logIn);

export default router;
