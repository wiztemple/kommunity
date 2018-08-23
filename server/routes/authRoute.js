import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Validate from '../middleware/validateAuth';

const authRoute = Router();

authRoute.post('/signup', Validate.validateUserInputs, AuthController.signUp);


export default authRoute;
