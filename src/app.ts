import express from "express";
import router from "./routes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

function createApp() {
    const app = express();

    app.use(express.json())
    app.use("/api", router);
    
    //rota documentaçao
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    return app;
}

export default createApp;