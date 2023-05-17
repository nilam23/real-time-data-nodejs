import mongoose from 'mongoose';
import {} from 'dotenv/config.js';
import { AppError } from '../helpers/error.js';
import { HTTP_STATUS_CODES } from '../helpers/constants.js';

/**
 * @description
 * the class is responsible for managing database connection
 */
export class MongooseConnection {
  constructor() {
    this.DB_URL = process.env.DB_DEV_URL;
    this.DB_OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
  }

  /**
   * @description
   * this method creates a new connection to the database
   */
  async createConnection() {
    try {
      await mongoose.connect(this.DB_URL, this.DB_OPTIONS);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const dbConfig = new MongooseConnection();

/**
 * @description
 * the express middleware function to create a new database connection
 * @param {object} next the next middleware function in the application’s request-response cycle
 */
export const createDbConnection = async (_, __, next) => {
  try {
    await dbConfig.createConnection();
    next();
  } catch (error) {
    next(new AppError(
      error.message || 'Error while trying to connect to database',
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error.response || error
    ));
  }
};
