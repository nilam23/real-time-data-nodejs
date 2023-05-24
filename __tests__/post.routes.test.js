/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import { app } from '../app.js';
import { HTTP_STATUS_CODES } from '../helpers/constants.js';

describe('post management routes', () => {
  const reqBody = {
    postCreation: {
      caption: 'test caption',
      image: 'some_base64_representation_of_image'
    },
    commentAddition: {
      text: 'some comment'
    }
  };

  const postIds = {
    existingPID: '646c76c2227e5c842d716341',
    nonExistentPID: '646c76c2227e5c842d716340'
  };

  const incorrectAccessToken = 'some_access_token';

  describe('fetch all posts from database', () => {
    it('returns 200 when data is fetched successfully', async () => {
      await supertest(app)
        .get('/posts')
        .expect(HTTP_STATUS_CODES.OK);
    });
  });

  describe('create a new post', () => {
    it('returns 401 when no access token provided', async () => {
      await supertest(app)
        .post('/posts/add')
        .send(reqBody.postCreation)
        .expect(HTTP_STATUS_CODES.UNAUTHORIZED);
    });

    it('returns 401 when an incorrect access token is provided', async () => {
      await supertest(app)
        .post('/posts/add')
        .send(reqBody.postCreation)
        .set({ Authroization: `Bearer ${incorrectAccessToken}` })
        .expect(HTTP_STATUS_CODES.UNAUTHORIZED);
    });
  });

  describe('fetch all comments for a specific post', () => {
    it('returns 404 when the post does not exist', async () => {
      await supertest(app)
        .get(`/posts/${postIds.nonExistentPID}/comments`)
        .expect(HTTP_STATUS_CODES.NOT_FOUND);
    });

    it('returns 200 for an existing post with zero or more comments', async () => {
      await supertest(app)
        .get(`/posts/${postIds.existingPID}/comments`)
        .expect(HTTP_STATUS_CODES.OK || HTTP_STATUS_CODES.NOT_FOUND); // NOT FOUND, if existing post gets deleted later
    });
  });

  describe('add a new comment to an existing post', () => {
    it('returns 401 when no access token provided', async () => {
      await supertest(app)
        .patch(`/posts/${postIds.existingPID}/comments/add`)
        .send(reqBody.commentAddition)
        .expect(HTTP_STATUS_CODES.UNAUTHORIZED);
    });

    it('returns 401 when an incorrect access token is provided', async () => {
      await supertest(app)
        .patch(`/posts/${postIds.existingPID}/comments/add`)
        .send(reqBody.commentAddition)
        .set({ Authroization: `Bearer ${incorrectAccessToken}` })
        .expect(HTTP_STATUS_CODES.UNAUTHORIZED);
    });
  });
});
