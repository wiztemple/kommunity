import db from '../models/question';

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
      questions: db,
    });
  }

  /**
   * @static method to get a single question
   * @param {object} request - request object
   * @param {object} response - response object
   */
  static getQuestion(request, response) {
    const foundQuestion = db.find(question => question.id === parseInt(request.params.questionId, 10));
    if (foundQuestion) {
      return response.status(200).json({
        status: 'success',
        message: 'question successfully retrieved',
        queryResult: foundQuestion,
      });
    }
    return response.status(404).json({
      status: 'fail',
      message: 'no question with such id',
    });
  }
}
