import { Express, Router, RequestHandler, ErrorRequestHandler } from 'express';
import { AppConfig } from './config/app-config';
import express = require('express');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import { Logger, LoggerFactory } from './common/logging/logger-factory';

export class ExpressAppFactory {

  private static readonly LOGGER: Logger = LoggerFactory.getLogger();

  private constructor() {}

  static getExpressApp(
    appConfig: AppConfig,
    apiRouter: Router,
    preApiRouterMiddlewareFns: Array<RequestHandler | ErrorRequestHandler>,
    postApiRouterMiddlewareFns: Array<RequestHandler | ErrorRequestHandler>): Express {

    const app: Express = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    if (appConfig.enableHttpRequestLogging) {
      ExpressAppFactory.LOGGER.info(`Request logging is enabled`);
      app.use(morgan('combined'));
    }

    if (preApiRouterMiddlewareFns != null) {
      postApiRouterMiddlewareFns.forEach((middlewareFn) => app.use(<RequestHandler>middlewareFn));
    }

    app.use('/api', apiRouter);

    if (postApiRouterMiddlewareFns != null) {
      postApiRouterMiddlewareFns.forEach((middlewareFn) => app.use(<RequestHandler>middlewareFn));
    }

    return app;
  }

}
