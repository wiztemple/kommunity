import {
  createQuestion, checkTitle, fetchAllQuestions, fetchAQuestion, removeQuestion,
} from '../models/query';
import db from '../models/connection';

export default class QuestionController {
  /**
             * @method getAllQuestion
             * @static
             * @description This returns all question
             * @param {object} request request object
             * @param {object} response response object
             *
             * @returns {Object} Object
             */
  static async getAllQuestion(request, response) {
    try {
      const fetchQuestion = await db.query(fetchAllQuestions());
      if (fetchQuestion) {
        return response.status(200).json({
          status: 'success',
          message: 'all questions',
          questions: fetchQuestion.rows,
        });
      }
      return response.status(404).json({
        status: 'fail',
        message: 'no question found',
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: 'Internal Server Error',
      });
    }
  }

  /**
             * @method getQuestion
             * @static
             * @description This returns a single question
             * @param {object} request request object
             * @param {object} response response object
             *
             * @returns {Object} Object
             */
  static async getQuestion(request, response) {
    const { questionId } = request.params;
    const parsedId = parseInt(questionId, 10);
    if (isNaN(parsedId)) {
      return response.status(400).json({
        status: 'fail',
        message: 'question id must be a number',
      });
    }
    const data = await db.query(fetchAQuestion(parsedId));
    if (data.rowCount === 0) {
      return response.status(404).json({
        status: 'fail',
        message: 'question not found',
      });
    }
    return response.status(200).json({
      status: 'success',
      message: 'question successfully returned',
      question: data.rows[0],
    });
  }

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
        title, questionBody, tag,
      } = request.body;
      const questionExists = await db.query(checkTitle(title, userId));
      if (questionExists.rowCount > 0) {
        return response.status(409).json({
          status: 'conflict',
          message: 'you already posted a question with similar title',
        });
      }
      const question = {
        title, questionBody, userId, tag,
      };
      const askQuestion = await db.query(createQuestion(question));
      if (askQuestion.rowCount === 0) {
        return response.status(500).json({
          status: 'fail',
          message: 'Internal Server Error',
        });
      }
      const questionObj = {
        id: askQuestion.rows[0].id,
        title: askQuestion.rows[0].title,
        questionBody: askQuestion.rows[0].question_body,
        tag: askQuestion.rows[0].tag,
        userId: askQuestion.rows[0].user_id,
      };
      return response.status(201).json({
        status: 'success',
        message: 'question successfully posted',
        questionObj,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  /**
             * @method postQuestion
             * @static
             * @description This handles user question creation
             * @param {object} request request object
             * @param {object} response response object
             *
             * @returns {Object} Object
             */
  static async deleteQuestion(request, response) {
    const userId = request.userId.id;
    const { questionId } = request.params;
    const parsedId = parseInt(questionId, 10);
    try {
      if (isNaN(parsedId)) {
        return response.status(400).json({
          status: 'fail',
          message: 'question id must be a number',
        });
      }
      const destroy = await db.query(removeQuestion(parsedId, userId));
      if (destroy.rowCount > 0) {
        return response.status(200).json({
          status: 'success',
          message: 'question successfully deleted',
        });
      }
      return response.status(404).json({
        status: 'fail',
        message: 'question id not found',
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }
}
