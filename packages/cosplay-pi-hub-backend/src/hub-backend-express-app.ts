import * as cors from 'cors';
import * as express from 'express';

export const hubBackendExpressApp = express();

hubBackendExpressApp.use(cors({
  origin: `*`,
}));
hubBackendExpressApp.use(express.json());
