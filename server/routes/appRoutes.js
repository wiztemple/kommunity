import Router from 'express';
import QuestionController from '../controllers/QuestionController';
import AnswerController from '../controllers/AnswerController';
import Validate from '../middleware/validate';

const appRoute = Router();

// get all questions
appRoute.get('/', QuestionController.getAllQuestions);

// get a question
appRoute.get('/:questionId', QuestionController.getQuestion);

// create a question
appRoute.post('/', Validate.validateInput, QuestionController.postQuestion);

// update a question
appRoute.put('/:questionId', QuestionController.editQuestion);

// delete a question
appRoute.delete('/:questionId', QuestionController.deleteQuestion);

// post answer
appRoute.post('/:questionId/answer', Validate.checkAnswer, AnswerController.postAnswer);

export default appRoute;
