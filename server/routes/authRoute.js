import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import ValidateAuth from '../middleware/ValidateAuth';

const authRoute = Router();

authRoute.post('/signup', ValidateAuth.validateUserInputs, AuthController.signUp);

authRoute.post('/login', ValidateAuth.signInValidation, AuthController.signIn);

authRoute.get('/users', AuthController.getAllUsers);

authRoute.get('/users/:userId', AuthController.userProfile);

export default authRoute;
