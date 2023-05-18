/* eslint-disable import/no-extraneous-dependencies */
import passport from 'passport';
import passportJwt from 'passport-jwt';
import { User } from '../models/user.model.js';

const JwtStrategy = passportJwt.Strategy;
const { ExtractJwt } = passportJwt;

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // extracting the the JWT token from the authorization header with the scheme 'bearer'
options.secretOrKey = process.env.JWT_SECRET; // secret same as the one used during token's signature to verify the incoming signature

/**
 * @description
 * implementing the passport jwt strategy for user auth management
 */
passport.use(new JwtStrategy(options, (jwtPayload, done) => {
  (
    async () => {
      try {
        const user = await User.findOne({ _id: jwtPayload.userId });

        if (user) return done(null, user);

        return done(new Error('Unauthorized! User not found'), null);
      } catch (error) {
        return done(error, false);
      }
    }
  )();
}));
