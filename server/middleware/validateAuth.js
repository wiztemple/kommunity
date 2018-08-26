export default class Validate {
  static validateUserInputs(request, response, next) {
    const {
      username, email, password,
    } = request.body;
    const nameFormat = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const emailPattern = /[^\s]*@[a-z0-9.-]*/i;

    if (username === undefined || email === undefined || password === undefined) {
      return response.status(400).json({
        status: 'fail',
        message: 'please define all fields'
      });
    }
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
      return response.status(400).json({
        status: 'fail',
        message: 'please fill all fields'
      });
    }
    if (nameFormat.test(username)) {
      return response.status(400).json({
        status: 'fail',
        message: 'username cannot contain special character',
      });
    }

    if (!emailPattern.test(email.trim())) {
      return response.status(400).json({
        status: 'fail',
        message: 'email format is invalid',
      });
    }
    if (password.length < 5) {
      return response.status(400).json({
        status: 'fail',
        message: 'password must be greater than 5',
      });
    }
    return next();
  }
}
