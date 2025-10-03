// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ESP Monitoring API',
    version: '1.0.0',
    description: 'API para monitoramento de sensores via ESP32',
  },
  servers: [
    {
      url: 'http://localhost:3333/api',
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes.ts'], // <== arquivo onde estão suas rotas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
