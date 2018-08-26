
import { postComment, checkAnswer } from '../models/query';
import db from '../models/connection';
/**
* @class AnswerController
*/

export default class CommentController {
  /**
   * @method postCommentOnAnswer
   * @static
   * @description This method posts comments on answers
   * @param {object} request request object
   * @param {object} response response object
   * @returns {Object} Object
  */
  static async postCommentOnAnswer(request, response) {
    const { commentBody } = request.body;
    const userId = request.userId.id;
    const { answerId } = request.params;
    const validateAnswer = await db.query((checkAnswer(answerId)));
    if (validateAnswer.rowCount > 0) {
      const post = await db.query(postComment(commentBody, userId, answerId));
      if (post.rowCount > 0) {
        return response.status(201).json({
          status: 'success',
          message: 'comment was successfully posted',
          comment: post.rows
        });
      }
      return response.status(500).json({
        status: 'fail',
        message: 'Internal Server Error'
      });
    }
    return response.status(404).json({
      status: 'fail',
      message: 'answer id does not exist'
    });
  }
}
