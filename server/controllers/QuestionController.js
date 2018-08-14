import db from '../models/index';

const { questions } = db;
/**
 * @class QuestionController
 */
export default class QuestionController {
  /**
   * static method to get all questions
   * @param {object} request - request object
   * @param {object} response - response object
   */
  static getAllQuestions(request, response) {
    return response.status(200).json({
      status: 'success',
      message: 'all questions',
      questions,
    });
  }
}
