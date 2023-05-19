import mongoose from 'mongoose';

/**
  * @description
  * Following schema describes how a post is stored inside the database
  * 'caption': specifies a caption for the post
  * 'image_path': specifies the s3 bucket path for the image of the post
  * 'userId': specifies the id of the user who created the post
  * 'comments': specifies the array of comments for a particular post
  * 'createdAt': specifies the time when the post was created
*/
const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, 'Please provide a caption']
  },
  image_path: {
    type: String,
    required: [true, 'Please provide an image path']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide the user id'],
    ref: 'User'
  },
  comments: [
    {
      commentText: {
        type: String,
        required: [true, 'Please provide a comment']
      },
      ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide the id of the owner'],
        ref: 'User'
      }
    }
  ],
  createdAt: {
    type: Date,
    required: [true, 'Please provide a date of creation'],
    default: Date.now
  }
});

export const Post = mongoose.model('post', postSchema);
