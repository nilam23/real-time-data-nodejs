/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import { app } from '../app.js';
import { User } from '../models/user.model.js';
import { HTTP_STATUS_CODES } from '../helpers/constants.js';

describe('user auth routes', () => {
  const reqBody = {
    success: {
      username: 'testuser',
      password: 'testpassword'
    },
    failure: {
      username: 'test'
    },
    passwordValidation_failure: {
      username: 'testuser',
      password: 'test'
    },
    incorrectUsername_failure: {
      username: 'test',
      password: 'testpassword'
    },
    incorrectPassword_failure: {
      username: 'testuser',
      password: 'testpasswordwrong'
    }
  };

  describe('sign up a new user', () => {
    it('returns 400 when required fields are not provided', async () => {
      await supertest(app)
        .post('/signup')
        .send(reqBody.failure)
        .expect(HTTP_STATUS_CODES.BAD_REQUEST);
    });

    it('returns 201 when user sign up is a success', async () => {
      await supertest(app)
        .post('/signup')
        .send(reqBody.success)
        .expect(HTTP_STATUS_CODES.CREATED);
    });

    it('returns 500 when trying to sign up using existing username', async () => {
      await supertest(app)
        .post('/signup')
        .send(reqBody.success)
        .expect(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    });

    it('returns 500 when trying to sign up with password validation fail', async () => {
      await supertest(app)
        .post('/signup')
        .send(reqBody.passwordValidation_failure)
        .expect(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    });
  });

  describe('log in an existing user', () => {
    it('returns 400 when required fields are not provided', async () => {
      await supertest(app)
        .post('/login')
        .send(reqBody.failure)
        .expect(HTTP_STATUS_CODES.BAD_REQUEST);
    });

    it('returns 200 when user log is a success', async () => {
      await supertest(app)
        .post('/login')
        .send(reqBody.success)
        .expect(HTTP_STATUS_CODES.OK);
    });

    it('returns 401 when use tries to log in with incorrect username', async () => {
      await supertest(app)
        .post('/login')
        .send(reqBody.incorrectUsername_failure)
        .expect(HTTP_STATUS_CODES.UNAUTHORIZED);
    });

    it('returns 401 when use tries to log in with incorrect password', async () => {
      await supertest(app)
        .post('/login')
        .send(reqBody.incorrectPassword_failure)
        .expect(HTTP_STATUS_CODES.UNAUTHORIZED);
    });
  });

  afterAll(async () => {
    await User.deleteOne({ username: reqBody.success.username });
  });
});
