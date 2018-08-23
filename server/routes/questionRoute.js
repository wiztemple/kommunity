import { Router } from 'express';
import QuestionController from '../controllers/QuestionController';
import verifyToken from '../middleware/verifyToken';
import ValidateData from '../middleware/validateData';

const questionRoute = Router();


questionRoute.post('/', verifyToken, ValidateData.validateInputs, QuestionController.postQuestion);

questionRoute.get('/', QuestionController.getAllQuestion);

questionRoute.get('/:questionId', QuestionController.getQuestion);

questionRoute.delete('/:questionId', verifyToken, QuestionController.deleteQuestion);

export default questionRoute;
