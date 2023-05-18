/**
 * different http status codes to be used in the application
 */
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * required fields for user sign up
 */
export const USER_AUTH_FIELDS = {
  USERNAME: 'username',
  PASSWORD: 'password'
};

/**
 * expiry of jwt token
 */
export const JWT_TOKEN_EXPIRY = 3600;
