/* eslint-disable import/no-extraneous-dependencies */
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST APIs and Real Time Data Using Node',
      version: '1.0.0'
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      }
    ]
  },
  apis: ['./routes/*.routes.js', './models/*.model.js']
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * @description
 * the method to render the swagger ui along with the application routes
 * @param {object} app the express application instance
 */
export const swaggerDocs = (app) => {
  // swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // docs in json format
  app.get('docs.json', (req, res) => {
    res.setHeader('Content-type', 'application/json');

    res.send(swaggerSpec);
  });
};
