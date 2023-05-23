/* eslint-disable no-undef */
require('dotenv').config({
  path: './.env.test'
});

if (process.env.NODE_ENV !== 'test') {
  throw Error('Non-test environment');
}

jest.setTimeout(30000);
