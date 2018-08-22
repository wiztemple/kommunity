import db from '../models/index';
import questions from '../models/question';

const { answers } = db;

export default class AnswerController {
  /**
   * @static method to answer a question
   * @param {object} request - request object
   * @param {object} response - response object
   */
  static postAnswer(request, response) {
    const {
      userId, answerBody,
    } = request.body;
    const questionExists = questions.find(question => question.id === parseInt(request.params.questionId, 10));
    if (questionExists) {
      const id = answers[answers.length - 1].id + 1;
      const data = {
        id, userId, answerBody,
      };
      answers.push(data);
      return response.status(201).json({
        status: 'success',
        message: 'new answer added',
        answer: data,
      });
    }
    return response.status(404).json({
      status: 'fail',
      message: 'question not found',
    });
  }
}
