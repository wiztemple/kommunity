import {
  postAnswer, fetchQuestionByAnswerId, setPreferedAnswer, updateAnswer, checkQuestionId, checkAnswerId,
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
    const checkQuestion = await db.query(checkQuestionId(questionId));
    if (checkQuestion.rowCount > 0) {
      console.log(postAnswer(answerBody, userId, questionId));
      const result = await db.query(postAnswer(answerBody, userId, questionId)).catch(error => error.message);
      console.log(result);
      if (result.rowCount > 0) {
        return response.status(201).json({
          status: 'success',
          message: 'Answer has been posted successfully',
          answer: result.rows,
        });
      }
      return response.status(500).json({
        status: 'fail',
        message: 'Internal Server Error',
      });
    }
    return response.status(404).json({
      status: 'fail',
      message: 'question id not found'
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
    console.log(request.params);
    const userId = request.userId.id;
    const { questionId } = request.params;
    console.log(questionId);
    const { answerId } = request.params;

    const { answerBody } = request.body;
    const checkIfAnswerExists = await db.query(checkAnswerId(questionId, answerId));
    if (checkIfAnswerExists.rowCount > 0) {
      const result = await db.query(fetchQuestionByAnswerId(answerId));
      if (result.rowCount > 0) {
        if (result.rows[0].question_creator === userId) {
          const preferredResult = await db.query(setPreferedAnswer(answerId));
          if (preferredResult.rowCount > 0) {
            return response.status(200).json({
              status: 'success',
              message: 'Answer has been set to preferred successfully',
              answer: preferredResult.rows,
            });
          }
          return response.status(500).json({
            status: 'fail',
            message: 'Internal Server Error',
          });
        }
        if (result.rows[0].answer_creator === userId) {
          const updateResult = await db.query(updateAnswer(answerBody, answerId, userId));
          if (updateResult.rowCount > 0) {
            return response.status(200).json({
              status: 'success',
              message: 'Answer has been updated successfully',
              answer: updateResult.rows,
            });
          }
          return response.status(500).json({
            status: 'fail',
            message: 'Internal Server Error',
          });
        }
        return response.status(404).json({
          status: 'fail',
          message: 'user cannot perform operation on answer',
        });
      }
      return response.status(500).json({
        status: 'fail',
        message: 'Internal Server Error',
      });
    }
    return response.status(404).json({
      status: 'fail',
      message: 'Answer does not exist for question',
    });
  }
}
