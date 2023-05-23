/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  verbose: true,
  testEnvironment: 'node',
  // setupFiles: ['./.jest/setEnvVars.js'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: true,
  coverageReporters: [
    'lcov',
    'text'
  ],
  coverageDirectory: './output/code-coverage',
};
