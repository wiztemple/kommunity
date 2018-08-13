import Router from 'express';
import QuestionController from '../controllers/QuestionController';

const appRoute = Router();

// get all questions
appRoute.get('/', QuestionController.getAllQuestions);

export default appRoute;
