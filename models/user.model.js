import mongoose from 'mongoose';
import { getHashPassword } from '../helpers/utils.js';

/**
  * @description
  * Following schema describes how a user is stored inside the database
  * 'username': specifies the unique username of a user
  * 'password': specifies the user password of minimum length of 5
*/
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide a username']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [5, 'Password length must be >= 5']
  }
});

/**
 * @description
 * the mongoose hook to hash the plaintext password before saving it in the database
 */
userSchema.pre('save', async function (next) {
  this.password = await getHashPassword(this.password);

  next();
});

export const User = mongoose.model('user', userSchema);
