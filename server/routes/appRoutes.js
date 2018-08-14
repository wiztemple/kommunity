import Router from 'express';
import QuestionController from '../controllers/QuestionController';

const appRoute = Router();

// get all questions
appRoute.get('/', QuestionController.getAllQuestions);

// get a question
// appRoute.get('/:questionId', QuestionController.getQuestion);

// create question
// appRoute.post('/', QuestionController.postQuestion);

export default appRoute;
