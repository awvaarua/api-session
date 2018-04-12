import 'core-js/library';

import { Logger, LoggerFactory } from './common/logging/logger-factory';
import { Express, Router } from 'express';
import { AppConfig } from '../config/app-config';
import { AppDataServices } from './data/app-data-services';
import { ExpressAppFactory } from './express-app-factory';
import { ApiRouterFactory } from './api/api-router-factory';
import { RestErrorMiddleware } from './common/rest/middleware/rest-error-middleware';
import { AppManagers } from './managers/app-managers';
const LOGGER: Logger = LoggerFactory.getLogger();

// Turn environment variables into a strongly typed configuration object
const appConfig: AppConfig = new AppConfig(process.env);

// Create the application data services
const appServices: AppDataServices = new AppDataServices();

// Create the application manager
const appManagers: AppManagers = new AppManagers(appServices);

// Create the application router (to be mounted by the express server)
const apiRouter: Router = ApiRouterFactory.getApiRouter(appManagers);

// Get the application middleware (to be mounted after the api router)
const errorMiddleware = [
  RestErrorMiddleware.normalizeToRestError,
  RestErrorMiddleware.serializeRestError
];

const app: Express = ExpressAppFactory.getExpressApp(appConfig, apiRouter, null, errorMiddleware);

////////////////////

app.listen(appConfig.port, () => {
  LOGGER.info(`Express server listening on port ${appConfig.port}`);
});