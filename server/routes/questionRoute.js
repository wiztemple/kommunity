import { Router } from 'express';
import QuestionController from '../controllers/QuestionController';
import AnswerController from '../controllers/AnswerController';
import CommentController from '../controllers/CommentControllers';
import verifyToken from '../middleware/verifyToken';
import ValidateData from '../middleware/validateData';

const questionRoute = Router();

// post question
questionRoute.post('/', verifyToken, ValidateData.validateInputs, QuestionController.postQuestion);

// get all questions
questionRoute.get('/', QuestionController.getAllQuestion);

// get top questions
questionRoute.get('/top', QuestionController.getMaxQuestion);

// get user question
questionRoute.get('/auth', verifyToken, QuestionController.getUserQuestions);

// get question by id
questionRoute.get('/:questionId', QuestionController.getQuestion);

// delete question
questionRoute.delete('/:questionId', verifyToken, QuestionController.deleteQuestion);

// post answer
questionRoute.post('/:questionId/answer', verifyToken, ValidateData.validateAnswer, AnswerController.postAnswer);

questionRoute.patch('/:questionId/answer/:answerId', verifyToken, AnswerController.editAnswer);

questionRoute.post('/:questionId/answer/:answerId/comment', verifyToken, ValidateData.validateComment, CommentController.postCommentOnAnswer);

export default questionRoute;
