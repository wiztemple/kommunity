import {
  postAnswer, fetchQuestionByAnswerId, setPreferedAnswer, updateAnswer, checkQuestionId, checkAnswerId, findQuestion,
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
   * @returns {Object} Object
  */
  static async postAnswer(request, response) {
    const userId = request.userId.id;
    const { questionId } = request.params;
    const { answerBody } = request.body;
    const checkQuestion = await db.query(checkQuestionId(questionId));
    try {
      if (checkQuestion.rowCount > 0) {
        const result = await db.query(postAnswer(answerBody, userId, questionId));
        if (result.rowCount > 0) {
          return response.status(201).json({
            status: 'success',
            message: 'Answer has been posted successfully',
            answer: result.rows,
          });
        }
      }
      return response.status(404).json({
        status: 'fail',
        message: 'question id not found'
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  /**
 * @method editAnswer
 * @static
 * @description This returns updates answer
 * @param {object} request request object
 * @param {object} response response object
 * @returns {Object} Object
*/
  static async editAnswer(request, response) {
    const userId = request.userId.id;
    const { questionId, answerId } = request.params;
    const { answerBody } = request.body;
    try {
      const checkQuestion = await db.query(findQuestion(questionId));
      if (checkQuestion.rowCount === 0) {
        return response.status(404).json({
          status: 'fail',
          message: 'question not found'
        });
      }
      const checkIfAnswerExists = await db.query(checkAnswerId(questionId, answerId));
      if (checkIfAnswerExists.rowCount === 0) {
        return response.status(404).json({
          status: 'fail',
          message: 'Answer does not exist for question',
        });
      }
      if (userId === checkQuestion.rows[0].user_id) {
        const preferredResult = await db.query(setPreferedAnswer(answerId));
        return response.status(200).json({
          status: 'success',
          message: 'Answer has been set to preferred successfully',
          answer: preferredResult.rows,
        });
      }
      if (userId === checkIfAnswerExists.rows[0].user_id) {
        const updateResult = await db.query(updateAnswer(answerBody, answerId, userId));
        if (updateResult.rowCount > 0) {
          return response.status(200).json({
            status: 'success',
            message: 'Answer has been updated successfully',
            answer: updateResult.rows,
          });
        }
      }
      return response.status(403).json({
        status: 'fail',
        message: 'you cannot perform this operation',
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}
