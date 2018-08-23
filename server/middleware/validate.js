
export default class Validate {
  static isNumber(request, response, next) {
    const questionId = request.params;
    const parseId = parseInt(questionId, 10);
    if (parseId !== 'number') {
      return response.status(400).json({
        status: 'fail',
        message: 'question id must be a number',
      });
    }
    return next();
  }

  static validateInput(request, response, next) {
    const { userId, topic, questionBody } = request.body;
    const topicFormat = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const parseId = parseInt(userId.trim(), 10);

    if (!userId || userId === '' || userId === undefined) {
      return response.status(400).json({
        status: 'fail',
        message: 'userId must be provided',
      });
    }
    if (typeof parseId !== 'number') {
      return response.status(400).json({
        status: 'fail',
        message: 'userId must be a number',
      });
    }
    if (topicFormat.test(topic)) {
      return response.status(400).json({
        status: 'fail',
        message: 'topic cannot contain special character',
      });
    }
    if (!topic || topic.trim() === '' || topic === undefined) {
      return response.status(400).json({
        status: 'fail',
        message: 'topic must be provided',
      });
    }
    if (!questionBody || questionBody.trim() === '' || questionBody === undefined) {
      return response.status(400).json({
        status: 'fail',
        message: 'question body must be available',
      });
    }
    return next();
  }

  static checkAnswer(request, response, next) {
    const { userId, answerBody } = request.body;
    const parseId = parseInt(userId.trim(), 10);
    if (!userId || userId === '' || userId === undefined) {
      return response.status(400).json({
        status: 'fail',
        message: 'userId must be provided',
      });
    }
    if (typeof parseId !== 'number') {
      return response.status(400).json({
        status: 'fail',
        message: 'userId must be a number',
      });
    }
    if (!answerBody || answerBody === '' || answerBody === undefined) {
      return response.status(400).json({
        status: 'fail',
        message: 'answer field cannot be empty',
      });
    }
    return next();
  }
}
