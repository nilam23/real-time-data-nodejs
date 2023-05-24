import { AuthController } from '../controllers/auth.controller.js';

/**
 * @description
 * the routes associated with user auth management
 * @param {object} app the express application instance
 */
export const authRoutes = (app) => {
  /**
   * @swagger
   * /signup:
   *   post:
   *     tags:
   *       - User Auth Management
   *     description: Registers a new user into the database
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserAuthSchema'
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
   *                   default: 'User signed up successfully'
   *                 data:
   *                   type: object
   *                   default: { "id": "646d2ab7eead2163ece3e658", "username": "demoUser" }
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
  app.route('/signup').post(AuthController.signUpUser);

  /**
   * @swagger
   * /login:
   *   post:
   *     tags:
   *       - User Auth Management
   *     description: Logs in an existing user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserAuthSchema'
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
   *                   default: 'User logged in successfully'
   *                 data:
   *                   type: object
   *                   default: { "id": "646d2ab7eead2163ece3e658", "username": "demoUser", "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZkMmFiN2VlYWQyMTYzZWNlM2U2NTgiLCJ1c2VybmFtZSI6ImRlbW9Vc2VyIiwiaWF0IjoxNjg0ODc2NDk1LCJleHAiOjE2ODQ4ODAwOTV9.5N0X-Tvnv7pko-g9qkEMjj0vDVckCB1q8X_8sf9uhQ8" }
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
   *                   default: 'Incorrect username'
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
  app.route('/login').post(AuthController.logUserIn);
};
