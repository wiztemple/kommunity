export default class ValidateData {
  static validateInputs(request, response, next) {
    const userId = request.userId.id;
    const parsedId = parseInt(userId, 10);
    const tagFormat = /^\d+$/;
    const {
      title, questionBody, tag
    } = request.body;
    if (
      !title || title === undefined || title.toString().trim() === '' || typeof title !== 'string'
    ) {
      return response.status(400).send({
        status: 'fail',
        message: 'title is required',
      });
    }

    if (
      !questionBody || questionBody === undefined || questionBody.toString().trim() === ''
    ) {
      return response.status(400).send({
        status: 'fail',
        message: 'question body is required',
      });
    }
    if (tagFormat.test(tag)) {
      return response.status(400).json({
        status: 'fail',
        message: 'tag cannot contain number',
      });
    }
    if (typeof parsedId !== 'number') {
      return response.status(400).send({
        status: 'fail',
        message: 'userId must be a number'
      });
    }
    return next();
  }

  static validateAnswer(request, response, next) {
    const { answerBody } = request.body;
    if (
      !answerBody || answerBody === undefined || answerBody.toString().trim() === '' || typeof answerBody !== 'string'
    ) {
      return response.status(400).send({
        status: 'fail',
        message: 'you cannot submit empty field',
      });
    }
    return next();
  }
}