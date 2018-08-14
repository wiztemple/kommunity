
export default class Validate {
    static validateInput(request, response, next) {
      const { userId, topic, questionBody } = request.body;
      const topicFormat = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
      if (!userId || userId === '' || userId === undefined) {
        return response.status(400).json({
          status: 'fail',
          message: 'userId must be provided',
        });
      }
      if (topicFormat.test(topic)) {
        return response.status(400).json({
          status: 'fail',
          message: 'topic cannot contain special character',
        });
      }
      if (topic.length > 20) {
        return response.status(400).json({
            status: 'fail',
            message: 'topic should not exceed 20 characters',.
        })
      }
      if (!topic || topic.trim() === '' || topic === undefined) {
        return response.status(400).json({
          status: 'fail',
          message: 'topic must be provide',
        });
      }
      if ((typeof topic !== 'string')) {
        return response.status(400).json({
          status: 'fail',
          message: 'not a string',
        });
      }
      if (!questionBody || questionBody.trim() === '' || questionBody === undefined) {
        return response.status(400).json({
          status: 'fail',
          message: 'question body is required',
        });
      }
      return next();
    }
  
}
  