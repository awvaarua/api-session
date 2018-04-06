import express = require('express');
import { Router } from 'express';
import { AppDataServices } from '../data/app-data-services';
import { UsersRouter } from './routes/users/users-router';
import { Logger, LoggerFactory } from '../common/logging/logger-factory';
import { InvalidResourceUrlError } from '../common/rest/errors';

////////////////////

export class ApiRouterFactory {

  private static readonly LOGGER: Logger = LoggerFactory.getLogger();

  private constructor() {}

  static getApiRouter(services: AppDataServices): Router {
    const router: Router = express.Router();

    const usersRouter: Router = new UsersRouter(services.usersService).router;

    ApiRouterFactory.LOGGER.info('Mounting users route');
    router.use('/users', usersRouter);

    router.all('*', (req, res, next) => {
      next(new InvalidResourceUrlError());
    });

    return router;
  }
}