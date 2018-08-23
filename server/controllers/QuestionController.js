import { createQuestion, checkTitle } from '../models/query';
import db from '../models/connection';

export default class QuestionController {
  /**
         * @method postQuestion
         * @static
         * @description This handles user question creation
         * @param {object} request request object
         * @param {object} response response object
         *
         * @returns {Object} Object
         */
  static async postQuestion(request, response) {
    try {
      const userId = request.userId.id;
      const {
        title, questionBody, tag
      } = request.body;
      const questionExists = await db.query(checkTitle(title, userId));
      if (questionExists.rowCount === 0) {
        const question = {
          title, questionBody, tag, userId
        };
        const askQuestion = await db.query(createQuestion(question));
        if (askQuestion.rowCount === 0) {
          return response.status(500).json({
            status: 'fail',
            message: 'Internal Server Error'
          });
        }
        const questionObj = {
          title: askQuestion.rows[0].title,
          questionBody: askQuestion.rows[0].question_body,
          tag: askQuestion.rows[0].tag,
          userId: askQuestion.rows[0].user_id
        };
        return response.status(201).json({
          status: 'success',
          message: 'question successfully posted',
          questionObj
        });
      }
      return response.status(409).json({
        status: 'conflict',
        message: 'you already posted a question with similar title'
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }
}
