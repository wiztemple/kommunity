import Router from 'express';
import QuestionController from '../controllers/QuestionController';

const appRoute = Router();

// get all questions
appRoute.get('/', QuestionController.getAllQuestions);

// get a question
appRoute.get('/:questionId', QuestionController.getQuestion);

// update a question
appRoute.put('/:questionId', QuestionController.editQuestion);

// delete a question
appRoute.delete('/:questionId', QuestionController.deleteQuestion);

export default appRoute;
