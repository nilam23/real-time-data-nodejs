/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import passport from 'passport';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import {} from 'dotenv/config.js';
import { createDbConnection } from './configs/db.config.js';
import { AppError, handleError } from './helpers/error.js';
import { HTTP_STATUS_CODES } from './helpers/constants.js';
import { authRoutes } from './routes/auth.routes.js';
import { postRoutes } from './routes/post.routes.js';
import { SocketioService } from './services/socketio.service.js';

// creating the express application instance
export const app = express();

// creating the http server and configuring socket io
export const server = http.createServer(app);
const socketio = new Server(server);
SocketioService.useSocketIo(socketio);

// middlewares
app.use(express.static(path.join('public')));
app.use(express.json());
app.use(passport.initialize());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(createDbConnection);

// routing
authRoutes(app);
postRoutes(app);

app.all('*', (req, _, next) => next(new AppError(
  `Can't find ${req.method} ${req.originalUrl} on this server!`,
  HTTP_STATUS_CODES.NOT_FOUND
)));

// centralized error handling
app.use((error, req, res, _) => handleError(error, req, res, _));

// running the server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port no ${PORT}`));
