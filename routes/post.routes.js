import { PostController } from '../controllers/post.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

/**
 * @description
 * the routes associated with post management
 * @param {object} app the express application instance
 */
export const postRoutes = (app) => {
  app
    .route('/posts')
    .post(AuthMiddlewares.verifyAuth, PostController.createNewPost);
};
