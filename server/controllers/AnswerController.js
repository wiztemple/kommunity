import db from '../models/index';

const { answers } = db;

export default class AnswerController {
  /**
   * @static method to answer a question
   * @param {object} request - request object
   * @param {object} response - response object
   */
  static postAnswer(request, response) {
    const { userId, questionId, answerBody, upvote, downvote, comment } = request.body;
    const checkUser = answers.find(el => el.topic === topic && el.userId === userId);
    if (checkUser) {
      return response.status(409).json({
        status: 'fail',
        message: 'question already exists',
      });
    }
    const id = answers[answers.length - 1].id + 1;
    const data = {
      id, userId, topic, questionBody,
    };
    questions.push(data);
    return response.status(201).json({
      status: 'success',
      message: 'new question added',
    });
  }
}
