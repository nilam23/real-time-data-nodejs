import { getJwtToken, verifyUserPassword } from '../helpers/utils.js';
import { User } from '../models/user.model.js';

export class AuthService {
  /**
   * @description
   * the auth service method to sign up a new user
   * @param {string} username the username of the user to be created
   * @param {string} password the plaintext password of the user to be created
   * @returns the newly created user
   */
  static async signUpUser(username, password) {
    const newUser = await User.create({ username, password });

    return newUser;
  }

  /**
   * @description
   * the auth service method to log in an existing user
   * @param {string} username the username of the user
   * @param {string} password the plaintext password of the user
   * @returns the logged in user along with the access token
   */
  static async logUserIn(username, password) {
    const user = await User.findOne({ username });

    if (user) {
      const authCheck = await verifyUserPassword(password, user.password);

      if (authCheck) {
        const jwtPayload = {
          userId: user._id,
          username
        };

        const token = getJwtToken(jwtPayload);

        return { user, token };
      }
      throw Error('Incorrect password');
    } throw Error('Incorrect username');
  }
}
