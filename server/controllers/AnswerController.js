import {
  postAnswer, fetchQuestionByAnswerId, setPreferedAnswer, updateAnswer
} from '../models/query';
import db from '../models/connection';
/**
 * @class AnswerController
 */
export default class AnswerController {
  /**
     * @method postAnswer
     * @static
     * @description This method handles post answer
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

  /**
     * @method editAnswer
     * @static
     * @description This returns updates answer
     * @param {object} request request object
     * @param {object} response response object
     *
     * @returns {Object} Object
    */
  static async editAnswer(request, response) {
    const userId = request.userId.id;
    const { answerId } = request.params;

    const { body } = request.body;
    const result = await db.query(fetchQuestionByAnswerId(answerId));
    if (result.rowCount > 0) {
      if (result.rows[0].question_creator === userId) {
        const preferredResult = await db.query(setPreferedAnswer(answerId));
        if (preferredResult.rowCount > 0) {
          return response.status(200).json({
            status: 'success',
            message: 'Answer has been set to preferred successfully',
            answer: preferredResult.rows
          });
        }
        return response.status(500).json({
          status: 'fail',
          message: 'Internal Server Error'
        });
      }
      if (result.rows[0].answer_creator === userId) {
        const updateResult = await db.query(updateAnswer(body, answerId, userId));
        if (updateResult.rowCount > 0) {
          return response.status(200).json({
            status: 'success',
            message: 'Answer has been updated successfully',
            answer: updateResult.rows
          });
        }
        return response.status(500).json({
          status: 'fail',
          message: 'Internal Server Error'
        });
      }
      return response.status(404).json({
        status: 'fail',
        message: 'user cannot perform operation on answer'
      });
    }
    return response.status(500).json({
      status: 'fail',
      message: 'Internal Server Error'
    });
  }
}
