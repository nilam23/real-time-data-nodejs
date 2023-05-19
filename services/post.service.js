import { s3ImageUpload, sortByCreatedDate } from '../helpers/utils.js';
import { Post } from '../models/post.model.js';

export class PostService {
  /**
   * @description
   * the method to create a new post
   * @param {string} caption the caption of the post to be created
   * @param {string} image_path the image path for the post to be created
   * @param {string} userId the id of the user who has created the post
   * @returns the newly created post
   */
  static async createNewPost(caption, image_path, userId) {
    const post = await Post.create({ caption, image_path, userId });

    return post;
  }

  /**
   * @description
   * the method that in turn invokes a utility method to upload the
   * base64 representation of the input image to an S3 bucket
   * @param {string} image the base64 representation of the input image
   * @param {string} image_path the image path inside S3 bucket
   */
  static async uploadPostImageToS3(image, image_path) {
    await s3ImageUpload(image, image_path);
  }

  /**
   * @description
   * the method that fetches all posts from database sorted by their date of creation
   * @returns posts fetched from database in a sorted order
   */
  static async fetchPostsSortedByCreatedDate() {
    const posts = await Post.find();

    sortByCreatedDate(posts);

    return posts;
  }
}
