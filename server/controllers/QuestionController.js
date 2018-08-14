import db from '../models/index';
import answers from '../models/answer';

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

  /**
   * @static method to get a single question
   * @param {object} request - request object
   * @param {object} response - response object
   */
  static getQuestion(request, response) {
    const foundQuestion = questions.find(question => question.id === parseInt(request.params.questionId, 10));
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


  /**
   * @static method to create a question
   * @param {object} request - request object
   * @param {object} response - response object
   */
  static postQuestion(request, response) {
    const { userId, topic, questionBody } = request.body;
    const checkUser = questions.find(el => el.topic === topic && el.userId === userId);
    if (checkUser) {
      return response.status(409).json({
        status: 'fail',
        message: 'question already exists',
      });
    }
    const id = questions[questions.length - 1].id + 1;
    const data = {
      id, userId, topic, questionBody,
    };
    questions.push(data);
    return response.status(201).json({
      status: 'success',
      message: 'new question added',
    });
  }

  /**
   * @static method to edit a question
   * @param {object} request - request object
   * @param {object} response - response object
   */

  static editQuestion(request, response) {
    const foundQuestion = questions.findIndex(question => question.id === parseInt(request.params.questionId, 10));
    if (foundQuestion) {
      questions[foundQuestion].userId = request.body.id;
      questions[foundQuestion].topic = request.body.topic;
      questions[foundQuestion].questionBody = request.body.questionBody;
      return response.status(200).json({
        status: 'success',
        message: 'question was successfully edited',
      });
    }
    return response.status(404).json({
      status: 'fail',
      message: 'question not found',
    });
  }
  /**
   * @static method to delete a question
   * @param {object} request - request object
   * @param {object} response - response object
   */

  static deleteQuestion(request, response) {
    const foundQuestion = questions.find(question => question.id === parseInt(request.params.questionId, 10));
    if (foundQuestion) {
      questions.splice(request.params.questionId - 1, 1);
      return response.status(200).json({
        status: 'success',
        message: 'question was successfully deleted',
      });
    }
    return response.status(404).json({
      status: 'fail',
      message: 'question not found',
    });
  }

  static postAnswer(request, response) {
    const foundQuestion = questions.find(question => question.id === parseInt(request.params.questionId, 10));
    if (foundQuestion) {
      const { userId, questionId, answerBody } = request.body;
      const id = answers[answers.length - 1].id + 1;
      const data = {
        id, userId, questionId, answerBody,
      };
      questions.push(data);
    }
    return response.status(404).json({
      status: 'fail',
      message: 'no question with such id',
    });
  }
}
