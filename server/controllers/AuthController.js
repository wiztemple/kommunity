import { createUserAccount, checkUser } from '../models/query';
import db from '../models/connection';
import PasswordUtility from '../helpers/passwordUtil';
import jwtSign from '../helpers/jwt';

/**
   * @class AuthController
   */
export default class AuthController {
  /**
       * @method signUp
       * @static
       * @description This handles user registration
       * @param {object} request request object
       * @param {object} response response object
       *
       * @returns {Object} Object
       */
  static async signUp(request, response) {
    const { username, email, password } = request.body;
    const userExists = await db.query(checkUser(username, email));
    if (userExists.rowCount > 0) {
      return response.status(409).json({
        status: 'fail',
        message: 'user already exists',
      });
    }
    const hashedPassword = await PasswordUtility.hashPassword(password);
    const user = { email, username, hashedPassword };
    const createUser = await db.query(createUserAccount(user));
    if (createUser.rowCount === 0) {
      return response.status(500).json({
        status: 'fail',
        message: 'Internal Server Error',
      });
    }
    const token = jwtSign(createUser.rows[0].id);
    const data = { token, username: createUser.rows[0].username, email: createUser.rows[0].email };
    return response.status(201).json({
      status: 'success',
      message: 'User successfully created',
      data,
    });
  }
}
