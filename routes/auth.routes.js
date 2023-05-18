import { AuthController } from '../controllers/auth.controller.js';

/**
 * @description
 * the routes associated with user auth management
 * @param {object} app the express application instance
 */
export const authRoutes = (app) => {
  app
    .route('/signup')
    .post(AuthController.signUpUser);

  app
    .route('/login')
    .post(AuthController.logUserIn);
};
