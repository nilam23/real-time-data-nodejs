import { PostController } from '../controllers/post.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

/**
 * @description
 * the routes associated with post management
 * @param {object} app the express application instance
 */
export const postRoutes = (app) => {
  /**
   * @swagger
   * /posts:
   *   get:
   *     tags:
   *       - Post Management
   *     description: Fetches all posts from database sorted by date of creation
   *     responses:
   *       200:
   *         description: OK
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 500
   *                 message:
   *                   type: string
   *                   default: 'Internal Server Error'
   *                 data:
   *                   type: array
   *                   default: []
   *                 error:
   *                   type: object
   *                   default: { "isOperational": false, "response": {} }
   */
  app.get('/posts', PostController.fetchAllPosts);

  /**
   * @swagger
   * /posts:
   *   post:
   *     tags:
   *       - Post Management
   *     description: Creates a new post
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               caption:
   *                 type: string
   *                 default: 'a demo caption'
   *               image:
   *                 type: string
   *                 default: '<base64 representation of the input image>'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 201
   *                 message:
   *                   type: string
   *                   default: 'Post created successfully'
   *                 data:
   *                   type: object
   *                   default: { "id": "646d3d084c5098af958d6c26",  "caption": "Demo caption", "image_path": "uploads/24-05-2023/8806aaee-1528-498f-8a23-4bacd3d43a8b", "owner": { "id": "646d2ab7eead2163ece3e658", "name": "demoUser" }, "comments": [] }
   *                 error:
   *                   type: object
   *                   default: {}
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 400
   *                 message:
   *                   type: string
   *                   default: 'Some fields are missing'
   *                 data:
   *                   type: array
   *                   default: []
   *                 error:
   *                   type: object
   *                   default: { "isOperational": true, "response": {} }
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 401
   *                 message:
   *                   type: string
   *                   default: 'Unauthorized! No access token found'
   *                 data:
   *                   type: array
   *                   default: []
   *                 error:
   *                   type: object
   *                   default: { "isOperational": true, "response": {} }
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 500
   *                 message:
   *                   type: string
   *                   default: 'Internal Server Error'
   *                 data:
   *                   type: array
   *                   default: []
   *                 error:
   *                   type: object
   *                   default: { "isOperational": false, "response": {} }
   */
  app.post('/posts', AuthMiddlewares.verifyAuth, PostController.createNewPost);

  /**
   * @swagger
   * /posts/{id}/comments:
   *   get:
   *     tags:
   *       - Post Management
   *     description: Fetches all comments from an existing post
   *     parameters:
   *       - name: id
   *         in: path
   *         description: a valid post id
   *         required: true
   *         schema:
   *          type: string
   *     responses:
   *       200:
   *         description: OK
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 404
   *                 message:
   *                   type: string
   *                   default: 'Post with id 6469cd679050774ce6d7bb8a not found'
   *                 data:
   *                   type: array
   *                   default: []
   *                 error:
   *                   type: object
   *                   default: { "isOperational": true, "response": {} }
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 500
   *                 message:
   *                   type: string
   *                   default: 'Internal Server Error'
   *                 data:
   *                   type: array
   *                   default: []
   *                 error:
   *                   type: object
   *                   default: { "isOperational": false, "response": {} }
   */
  app.get('/posts/:id/comments', PostController.getCommentsForPost);

  /**
   * @swagger
   * /posts/{id}/comments:
   *   patch:
   *     tags:
   *       - Post Management
   *     security:
   *       - beareAuth: []
   *     description: Adds a new comment to an existing post
   *     parameters:
   *       - name: id
   *         in: path
   *         description: a valid post id
   *         required: true
   *         schema:
   *          type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               text:
   *                 type: string
   *                 default: 'a demo comment'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 200
   *                 message:
   *                   type: string
   *                   default: 'A new comment added to post with id 646c76c2227e5c842d716341'
   *                 data:
   *                   type: object
   *                   default: { comments: [ { "commentText": "a demo comment", "ownerId": "646d2ab7eead2163ece3e658", "ownerName": "demoUser", "_id": "646d385c0fef21181067eb67" } ] }
   *                 error:
   *                   type: object
   *                   default: {}
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 400
   *                 message:
   *                   type: string
   *                   default: 'Comment text is missing'
   *                 data:
   *                   type: array
   *                   default: []
   *                 error:
   *                   type: object
   *                   default: { "isOperational": true, "response": {} }
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 401
   *                 message:
   *                   type: string
   *                   default: 'Unauthorized! No access token found'
   *                 data:
   *                   type: array
   *                   default: []
   *                 error:
   *                   type: object
   *                   default: { "isOperational": true, "response": {} }
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: number
   *                   default: 500
   *                 message:
   *                   type: string
   *                   default: 'Internal Server Error'
   *                 data:
   *                   type: array
   *                   default: []
   *                 error:
   *                   type: object
   *                   default: { "isOperational": false, "response": {} }
   */
  app.patch('/posts/:id/comments', AuthMiddlewares.verifyAuth, PostController.addCommentToAPost);
};
