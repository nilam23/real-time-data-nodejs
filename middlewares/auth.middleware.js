/* eslint-disable import/no-extraneous-dependencies */
import passport from 'passport';
import {} from '../configs/auth.config.js';
import { AppError } from '../helpers/error.js';
import { HTTP_STATUS_CODES } from '../helpers/constants.js';

export const AuthMiddlewares = {};

/**
 * @description
 * the auth middleware method to verify authenticity of the user trying to access a protected route
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {object} next the next middleware function in the application’s request-response cycle
 */
AuthMiddlewares.verifyAuth = async (req, res, next) => passport.authenticate(
  'jwt',
  { session: false },
  (strategyError, user, passportError) => {
    if (strategyError) {
      return next(new AppError(`${strategyError.message}`, HTTP_STATUS_CODES.UNAUTHORIZED));
    }

    if (user) {
      req.user = user;
      return next();
    }

    if (passportError.message === 'invalid signature') return next(new AppError('Unauthorized! Invalid access token', HTTP_STATUS_CODES.UNAUTHORIZED));

    if (passportError.message === 'No auth token') return next(new AppError('Unauthorized! No access token found', HTTP_STATUS_CODES.UNAUTHORIZED));
  }
)(req, res, next);
