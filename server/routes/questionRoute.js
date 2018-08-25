import { Router } from 'express';
import QuestionController from '../controllers/QuestionController';
import AnswerController from '../controllers/AnswerController';
import verifyToken from '../middleware/verifyToken';
import ValidateData from '../middleware/validateData';

const questionRoute = Router();

// post question
questionRoute.post('/', verifyToken, ValidateData.validateInputs, QuestionController.postQuestion);

// get all questions
questionRoute.get('/', QuestionController.getAllQuestion);

// get user question
questionRoute.get('/auth', verifyToken, QuestionController.getUserQuestions);

// get question by id
questionRoute.get('/:questionId', QuestionController.getQuestion);

// delete question
questionRoute.delete('/:questionId', verifyToken, QuestionController.deleteQuestion);

// post answer
questionRoute.post('/:questionId/answer', verifyToken, ValidateData.validateAnswer, AnswerController.postAnswer);

questionRoute.put('/:questionId/answer/:answerId', verifyToken, AnswerController.editAnswer);

export default questionRoute;
