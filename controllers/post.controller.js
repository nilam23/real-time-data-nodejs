/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { HTTP_STATUS_CODES, POST_CREATION_INPUT_FIELDS } from '../helpers/constants.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AppError } from '../helpers/error.js';
import { PostService } from '../services/post.service.js';
import { redisConfig } from '../configs/redis.config.js';

export class PostController {
  /**
   * @description
   * the controller method to create a new post
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application's request-response cycle
   * @returns the newly created post
   */
  static async createNewPost(req, res, next) {
    try {
      if (!isAvailable(req.body, Object.values(POST_CREATION_INPUT_FIELDS))) return next(new AppError('Some fields are missing', HTTP_STATUS_CODES.BAD_REQUEST));

      const { caption, image } = req.body;
      const { _id: userId, username: name } = req.user;
      const image_path = `uploads/${moment().format('DD-MM-YYYY')}/${uuid()}`;
      const postCreationTime = moment();

      await PostService.uploadPostImageToS3(image, image_path);

      const { _id: id, comments } = await PostService.createNewPost(caption, image_path, { id: userId, name }, postCreationTime);

      const createdPost = {
        id,
        caption,
        image_path,
        owner: { id: userId, name },
        comments
      };

      // publishing the newly created post so that it can be consumed and emitted to the client side
      await redisConfig.produce('post', JSON.stringify({ ...createdPost, image, createdAt: postCreationTime.toString().split('GMT')[0] }));

      return sendResponse(res, HTTP_STATUS_CODES.CREATED, 'Post created successfully', createdPost);
    } catch (error) {
      return next(new AppError(
        error.message || 'Internal Server Error',
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        error.response || error
      ));
    }
  }

  /**
   * @description
   * the controller method to fetch all posts sorted by their created date
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application's request-response cycle
   * @returns the posts fetched from database in sorted order
   */
  static async fetchAllPosts(_, res, next) {
    try {
      const posts = await PostService.fetchPostsSortedByCreatedDate();

      // if (!posts.length) return next(new AppError('No posts found', HTTP_STATUS_CODES.NOT_FOUND));

      // return sendResponse(res, HTTP_STATUS_CODES.OK, 'Posts fetched successfully', posts);

      res.render('posts', { posts });
    } catch (error) {
      return next(new AppError(
        error.message || 'Internal Server Error',
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        error.response || error
      ));
    }
  }

  /**
   * @description
   * the controller method to fetch all comments for a particular post
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application's request-response cycle
   * @returns the array of comments for the post
   */
  static async getCommentsForPost(req, res, next) {
    try {
      if (!req.params.id) return next(new AppError('Post id is missing from the request', HTTP_STATUS_CODES.BAD_REQUEST));

      const { id: postId } = req.params;

      const post = await PostService.getPostById(postId);

      if (!post) return next(new AppError(`Post with id ${postId} not found`, HTTP_STATUS_CODES.NOT_FOUND));

      // if (!post.comments.length) return next(new AppError(`Comments for the post with id ${postId} not found`, HTTP_STATUS_CODES.NOT_FOUND));

      // return sendResponse(res, HTTP_STATUS_CODES.OK, `All comments fetched for the post with id ${postId}`, post.comments);

      res.render('comments', { comments: post.comments });
    } catch (error) {
      return next(new AppError(
        error.message || 'Internal Server Error',
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        error.response || error
      ));
    }
  }

  /**
   * @description
   * the controller method to add a new comment to an exisiting post and update the same
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application's request-response cycle
   * @returns the updated post with newly added comment
   */
  static async addCommentToAPost(req, res, next) {
    try {
      if (!req.params.id) return next(new AppError('Post id is missing from the request', HTTP_STATUS_CODES.BAD_REQUEST));

      if (!req.body.text) return next(new AppError('Comment text is missing', HTTP_STATUS_CODES.BAD_REQUEST));

      const { id: postId } = req.params;
      const { text: commentText } = req.body;
      const { _id: ownerId, username: ownerName } = req.user;

      const post = await PostService.getPostById(postId);

      if (!post) return next(new AppError(`Post with id ${postId} not found`, HTTP_STATUS_CODES.NOT_FOUND));

      const commentObj = { commentText, ownerId, ownerName };

      const updatedPost = await PostService.updatePostWithNewComment(post, commentObj);

      // publishing the newly added comment so that it can be consumed and emitted to the client side
      await redisConfig.produce('comment', JSON.stringify(commentObj));

      return sendResponse(res, HTTP_STATUS_CODES.OK, `A new comment added to post with id ${postId}`, { comments: updatedPost.comments });
    } catch (error) {
      return next(new AppError(
        error.message || 'Internal Server Error',
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        error.response || error
      ));
    }
  }
}
