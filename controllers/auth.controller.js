import { HTTP_STATUS_CODES, USER_AUTH_FIELDS } from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  /**
   * @description
   * the controller method to sign up a new user
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the newly created user
   */
  static async signUpUser(req, res, next) {
    try {
      if (!isAvailable(req.body, Object.values(USER_AUTH_FIELDS))) return next(new AppError('Some fields are missing', HTTP_STATUS_CODES.BAD_REQUEST));

      const { username, password } = req.body;

      const newUser = await AuthService.signUpUser(username, password);

      return sendResponse(res, HTTP_STATUS_CODES.CREATED, 'User signed up successfully', { id: newUser._id, username });
    } catch (error) {
      let errorMsg = '';

      if (error.code === 11000) errorMsg = 'Username already exists'; // for database unique constraint violation error
      else if (error.name === 'ValidationError') errorMsg = error.errors[Object.keys(error.errors)[0]].message; // for user password validation error
      else errorMsg = error.message || 'Internal Server Error'; // for other errors

      next(new AppError(
        errorMsg,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        error.response || error
      ));
    }
  }

  /**
   * @description
   * the controller method to log in an existing user
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the information of the logged in user
   */
  static async logUserIn(req, res, next) {
    try {
      if (!isAvailable(req.body, Object.values(USER_AUTH_FIELDS))) return next(new AppError('Some fields are missing', HTTP_STATUS_CODES.BAD_REQUEST));

      const { username, password } = req.body;

      const { user, token: accessToken } = await AuthService.logUserIn(username, password);

      return sendResponse(res, HTTP_STATUS_CODES.OK, 'User logged in successfully', { id: user._id, username, accessToken });
    } catch (error) {
      next(new AppError(
        error.message || 'Internal Server Error',
        error.message === 'Incorrect username'
        || error.message === 'Incorrect password'
          ? HTTP_STATUS_CODES.UNAUTHORIZED
          : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        error.response || error
      ));
    }
  }
}
