/**
 * @class ValidateAuth
 */
export default class ValidateAuth {
  /**
 * @method validateUserInputs
 * @static
 * @description This sanitizes auth data
 * @param {object} request request object
 * @param {object} response response object
 * @returns {Object} Object
 */
  static validateUserInputs(request, response, next) {
    const {
      username, email, password,
    } = request.body;
    const nameFormat = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  /**
 * @method signInValidation
 * @static
 * @description This validates user login
 * @param {object} request request object
 * @param {object} response response object
 *
 * @returns {Object} Object
 */
  static signInValidation(request, response, next) {
    const { username, password } = request.body;
    if (username === undefined || password === undefined) {
      return response.status(400).json({
        status: 'fail',
        message: 'please define all fields'
      });
    }
    if (username.trim() === '' || password.trim() === '') {
      return response.status(400).json({
        status: 'fail',
        message: 'please fill all fields'
      });
    }
    return next();
  }
}
