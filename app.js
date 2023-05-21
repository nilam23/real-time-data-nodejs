import express from 'express';
import passport from 'passport';
import {} from 'dotenv/config.js';
import { createDbConnection } from './configs/db.config.js';
import { AppError, handleError } from './helpers/error.js';
import { HTTP_STATUS_CODES } from './helpers/constants.js';
import { authRoutes } from './routes/auth.routes.js';
import { postRoutes } from './routes/post.routes.js';

// creating the express application instance
const app = express();

// middlewares
app.use(express.json());
app.use(passport.initialize());
app.use(express.static('public'));
app.use(createDbConnection);
app.set('view engine', 'ejs');

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

app.listen(PORT, () => console.log(`Server running on port no ${PORT}`));
