import { postAnswer } from '../models/query';
import db from '../models/connection';

export default class AnswerController {
  /**
     * @method postAnswer
     * @static
     * @description This returns all question
     * @param {object} request request object
     * @param {object} response response object
     *
     * @returns {Object} Object
    */
  static async postAnswer(request, response) {
    const userId = request.userId.id;
    const { questionId } = request.params;
    const { answerBody } = request.body;
    const result = await db.query(postAnswer(answerBody, userId, questionId)).catch(error => error.message);
    if (result.rowCount > 0) {
      return response.status(200).json({
        status: 'success',
        message: 'Answer has been posted successfully',
        answer: result.rows
      });
    }
    return response.status(500).json({
      status: 'fail',
      message: 'Internal Server Error'
    });
  }
}
