import { PostController } from '../controllers/post.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

/**
 * @description
 * the routes associated with post management
 * @param {object} app the express application instance
 */
export const postRoutes = (app) => {
  app.get('/posts', PostController.fetchAllPosts);
  app.post('/posts/add', AuthMiddlewares.verifyAuth, PostController.createNewPost);
  app.get('/posts/:id/comments', PostController.getCommentsForPost);
  app.patch('/posts/:id/comments/add', AuthMiddlewares.verifyAuth, PostController.addCommentToAPost);
};
