import express = require('express');
import { Router } from 'express';
import { AppDataServices } from '../infrastructure/app-data-services';
import { UsersRouter } from './routes/users/users-router';
import { SessionRouter } from './routes/session/session-router';
import { Logger, LoggerFactory } from '../common/logging/logger-factory';
import { InvalidResourceUrlError } from '../common/rest/errors';
import { AppManagers } from '../managers/app-managers';

export class ApiRouterFactory {

  private static readonly LOGGER: Logger = LoggerFactory.getLogger();

  private constructor() {}

  static getApiRouter(managers: AppManagers): Router {
    const router: Router = express.Router();

    const usersRouter: Router = new UsersRouter(managers.userManager).router;
    const sessionRouter: Router = new SessionRouter(managers.sessionManager).router;

    ApiRouterFactory.LOGGER.info('Mounting users route');
    router.use('/users', usersRouter);

    ApiRouterFactory.LOGGER.info('Mounting session route');
    router.use('/session', sessionRouter);

    router.all('*', (req, res, next) => {
      next(new InvalidResourceUrlError());
    });

    return router;
  }
}