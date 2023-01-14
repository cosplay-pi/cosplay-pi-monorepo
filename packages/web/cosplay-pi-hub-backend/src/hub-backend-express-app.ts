import * as express from 'express';

export const hubBackendExpressApp = express();
hubBackendExpressApp.use(express.json());
