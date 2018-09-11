import {
  createUserAccount, checkUser, findUser, findById, fetchAllUsers
} from '../models/query';
import db from '../models/connection';
import PasswordUtility from '../helpers/passwordUtility';
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
    const token = jwtSign({ id: createUser.rows[0].id, username: createUser.rows[0].username }, process.env.JWT_SECRET,
      { expiresIn: 86400 });
    const data = { token, username: createUser.rows[0].username, email: createUser.rows[0].email };
    return response.status(201).json({
      status: 'success',
      message: 'User successfully created',
      data,
    });
  }

  static async signIn(request, response) {
    const { username, password } = request.body;
    const fetchUser = await db.query(findUser(username));
    if (fetchUser.rowCount === 0) {
      return response.status(400).json({
        status: 'fail',
        message: 'Invalid username or password',
      });
    }
    const validatePassword = await PasswordUtility.verifyPassword(password, fetchUser.rows[0].password);
    if (validatePassword === false) {
      return response.status(400).json({
        status: 'fail',
        message: 'password mismatch',
      });
    }
    const token = jwtSign({ id: fetchUser.rows[0].id, username: fetchUser.rows[0].username }, process.env.JWT_SECRET,
      { expiresIn: 86400 });
    const data = { token, username: fetchUser.rows[0].username, email: fetchUser.rows[0].email };
    return response.status(200).json({
      status: 'success',
      message: 'login successful',
      data,
    });
  }

  /**
 * @method getAllUsers
 * @static
 * @description This returns all users
 * @param {object} request request object
 * @param {object} response response object
 * @returns {Object} Object
 */
  static async getAllUsers(request, response) {
    try {
      const allUsers = await db.query(fetchAllUsers());
      if (allUsers.rowCount === 0) {
        return response.status(404).json({
          status: 'fail',
          message: 'no user found',
        });
      }
      return response.status(200).json({
        status: 'success',
        message: 'users',
        users: allUsers.rows,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: 'Internal Server Error',
      });
    }
  }

  /**
 * @method userProfile
 * @static
 * @description This returns a user profile
 * @param {object} request request object
 * @param {object} response response object
 * @returns {Object} Object
 */
  static async userProfile(request, response) {
    const { userId } = request.params;
    const parsedId = parseInt(userId, 10);
    if (Number.isNaN(parsedId) === true) {
      return response.status(400).json({
        status: 'fail',
        message: 'user id must be a number',
      });
    }
    const foundUser = await db.query(findById(parsedId));
    if (foundUser.rowCount === 0) {
      return response.status(404).json({
        status: 'fail',
        message: 'user not found'
      });
    }
    return response.status(200).json({
      status: 'success',
      message: 'user returned successfully',
      user: foundUser.rows,
    });
  }
}
