/* eslint-disable new-cap */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN_EXPIRY } from './constants.js';
import { S3 } from '../configs/s3.config.js';

/**
 * @description
 * this method is responsible for sending response back to the client
 * @param {object} res the response object
 * @param {number} statusCode the http status code
 * @param {string} message the response message
 * @param {object} data the data to be sent back to the client
 * @param {object} error the error object, when exists
 * @returns the response to be sent back to the client
 */
export const sendResponse = (response, statusCode, message, data = [], error = {}) => {
  response.status(statusCode).json({
    statusCode,
    message,
    data,
    error
  });
};

/**
 * @description
 * this method receives a targetObject of which keys are to be checked
 * with the corresponding array of required fields
 * @param {object} targetObject object of which keys are to be checked
 * @param {array} requiredFieldsArray array of fields to be checked in the targetObject
 * @returns a boolean confirming the match
 */
export const isAvailable = (targetObj, requiredFieldsArr) => {
  const targetKeysArr = Object.keys(targetObj);

  const match = requiredFieldsArr.every((field) => targetKeysArr.includes(field));

  return match;
};

/**
 * @description
 * this method recieves the user's plaintext password and produces a hash of the same
 * @param {string} password the plaintext password of the user
 * @returns the hash value of the password
 */
export const getHashPassword = async (password) => {
  const salt = await bcrypt.genSalt();

  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

/**
 * @description
 * this method receives user's password from log in request and the password saved in the database
 * and then verifies both of them
 * @param {string} plainTextPassword the password entered by the user during log in
 * @param {string} hashPassword the password extracted from the database
 * @returns a boolean confirming the password verification
 */
export const verifyUserPassword = async (plainTextPassword, hashPassword) => {
  const validation = await bcrypt.compare(plainTextPassword, hashPassword);

  return validation;
};

/**
 * @description
 * this method creates a jwt token using a payload of user id and username
 * @param {object} jwtPayload the jwt payload consisting of user id and username
 * @returns the jwt token
 */
export const getJwtToken = (jwtPayload) => jwt.sign(
  {
    userId: jwtPayload.userId,
    username: jwtPayload.username
  },
  process.env.JWT_SECRET,
  { expiresIn: JWT_TOKEN_EXPIRY }
);

/**
 * @description
 * this method sorts the array of posts by their date of creation
 * @param {array} posts the array of posts fetched from database
 * @returns the array of posts sorted by their date of creation
 */
export const sortByCreatedDate = (posts) => posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

/**
 * @description
 * this method uploads the base64 representation of the input image to an S3 bucket
 * @param {string} image the base64 representation of the input image
 * @param {string} image_path the image path inside S3 bucket
 */
export const s3ImageUpload = (image, image_path) => {
  const buffer = new Buffer.from(image, 'base64');

  const data = {
    Key: image_path,
    Body: buffer,
    ContentEncoding: 'base64'
  };

  return S3.putObject(data).promise();
};

/**
 * @description
 * this method takes an image path for S3 and then fetches the corresponding image object from S3 bucket
 * @param {string} imagePath the image path inside S3 bucket to retrieve the image object
 * @returns the image object retrieved from S3
 */
export const getS3ImageObj = async (imagePath) => {
  const getImageObjResult = await S3.getObject({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: imagePath
  }).promise();

  return getImageObjResult;
};
