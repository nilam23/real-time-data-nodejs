## Project Overview

`Description`: Implementation of REST APIs to demonstrate the use of Socket.io and Redis in order to fetch Real Time Data. The project also includes data storage in AWS S3, user authentication and authorization via Passport JWT, unit test cases written in JEST and Supertest to ensure APIs are working correctly and a swagger API and database schema documentation.

`Backend`: NodeJS, ExpressJS

`Database`: MongoDB with Mongoose ORM

`Auth`: Passport JWT

`SDKs`: AWS-SDK for AWS S3

`Real Time Data Fetching`: Socket.io, Redis

`Documentation`: Swagger

## Environment variables

### 1. Environment variables for database configuration

`DB_DEV_URL`: Defines the Mongoose connection url for DEV environment.

### 2. Environment variables for AWS S3 configuration
`AWS_REGION`: Defines the AWS region to be used.

`AWS_S3_BUCKET_NAME`: Defines the name of the AWS S3 bucket to store application media.

### 3. Environment variables for Redis configuration
`REDIS_HOST_DEV`: Defines the host for Redis in the DEV environment.

`REDIS_PORT_DEV`: Defines the port no for Redis in the DEV environment. By default, the port no is 6379

### 4. Other environment variables
`JWT_SECRET`: Defines the secret to be used in passport-jwt strategy.

`PORT`: Defines the application port no for the DEV environment.

## Steps to run the application

1. Make sure that you have `node` and `nodemon` installed.
2. If you are using VS Code, make sure that you have the `ESLint` extension enabled to avoid the possible linting errors.
3. Clone the repository.
4. Move into the project directory using `cd <path_to_project_directory>`
5. Install the required packages using `npm install`
6. Create a `.env` file at the root of the directory and set the environment variables as described above.
7. Now run the application using `npm run start`

## Steps to run the test suites

1. `npm run test:run-all`: to run all test cases of the application concurrently.
2. To check the code coverage, please move into the `./output` directory and from inside `lcov-report`, open the `index.html` file.

## APIs and related Schemas

1. A swagger is implemented that lists all application routes along with associated schemas.
2. Please make sure that the application is running error-free.
3. For DEV environment, please go to `http://localhost:3000/docs` in order to view the API docs and related schemas.