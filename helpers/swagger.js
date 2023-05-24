/* eslint-disable import/no-extraneous-dependencies */
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerJsDocs = YAML.load('./api.yaml');

/**
 * @description
 * the method to render the swagger ui along with the application routes
 * @param {object} app the express application instance
 */
export const swaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));
};
