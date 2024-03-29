/* eslint-disable no-await-in-loop */
import { getS3ImageObj, s3ImageUpload, sortByCreatedDate } from '../helpers/utils.js';
import { Post } from '../models/post.model.js';

export class PostService {
  /**
   * @description
   * the method to create a new post
   * @param {string} caption the caption of the post to be created
   * @param {string} image_path the image path for the post to be created
   * @param {object} owner the details of the user who created the post
   * @param {object} createdAt the date/time at which the post is being created
   * @returns the newly created post
   */
  static async createNewPost(caption, image_path, owner, createdAt) {
    const post = await Post.create({
      caption, image_path, owner, createdAt
    });

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
   * and then returns the posts along with their image data fetched from S3 bucket
   * @returns posts fetched from database in a sorted order along with image data
   */
  static async fetchPostsSortedByCreatedDate() {
    const posts = await Post.find();

    if (posts.length) {
      sortByCreatedDate(posts);

      const postsWithImageData = [];
      for (let i = 0; i < posts.length; i++) {
        const imageObjFromS3 = await getS3ImageObj(posts[i].image_path);

        postsWithImageData.push({
          ...posts[i]._doc,
          image: imageObjFromS3.Body,
        });
      }

      return postsWithImageData;
    }

    return posts;
  }

  /**
   * @description
   * the method that fetches a post from the database corresponding to an id
   * @param {string} postId the id of the post
   * @returns the post fetched from the database
   */
  static async getPostById(postId) {
    const post = await Post.findById(postId);

    return post;
  }

  /**
   * @description
   * the method that adds a new comment to an existing post and updates the same
   * @param {object} post the post to be updated
   * @param {object} commentObj the object containing comments details
   * @returns the updated post
   */
  static async updatePostWithNewComment(post, commentObj) {
    post.comments.push(commentObj);

    const updatedPost = await post.save();

    return updatedPost;
  }
}
