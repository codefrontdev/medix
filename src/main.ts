import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLoggerService } from './app/@core/logger/app-logger.service';
import { AppValidationPipe } from './app/@core/pipes/app-validation.pipe';
import { AppConfigsService } from './app/@core/configs/app-configs.service';
import { appCorsOptions } from './app/@core/cors/app-cors-options';
import { AppGlobalExceptionFilter } from './app/@core/filters/app-global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ProtectedFilesMiddleware } from './app/@core/middlewares/protected-files.middleware';
import { RequestsLoggerMiddleware } from './app/@core/middlewares/requests-logger.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getPublicDirectory } from './app/@core/utils/functions/miedas-functions';
import { mediasConstants } from './app/features/medias/domain/constants/medias-constants';
import { JwtProviderService } from './app/features/auth/application/services/jwt-provider.service';
import mongoose from 'mongoose';
import { IoAdapter } from '@nestjs/platform-socket.io';
//import * as crypto from 'crypto';

//global.crypto = crypto as any;
declare const module: any;

async function bootstrap(): Promise<void> {
  const app =
    await NestFactory
      .create<NestExpressApplication>(
        AppModule,
        {
          bufferLogs: true,
          logger: ['error', 'warn', 'log', 'debug'],
        }
      );
// Enable WebSocket adapter
app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors(
    appCorsOptions,
  )

  await pipes(
    app,
  );

  app
    .setGlobalPrefix(
      'api',
    );

  const appLoggerService =
    app.get(
      AppLoggerService,
    );

  app
    .useLogger(
      appLoggerService,
    );

  await filters(
    app,
    appLoggerService,
  )

  await middlewares(
    app,
    appLoggerService,
  );

  app
    .useStaticAssets(
      getPublicDirectory(),
      {
        prefix: `/${mediasConstants.paths.public}`,
      },
    );

  await run(
    app,
    appLoggerService,
  );

  await hotReload(
    app,
  );
}

async function pipes(
  app: NestExpressApplication,

): Promise<void> {
  app
    .useGlobalPipes(
      new AppValidationPipe(),
    );

  app
    .useGlobalPipes(
      new ValidationPipe(
        {
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
          disableErrorMessages: false,
        },
      ),
    );
}

async function filters(
  app: NestExpressApplication,
  appLoggerService: AppLoggerService,
): Promise<void> {
  app
    .useGlobalFilters(
      new AppGlobalExceptionFilter(
        appLoggerService,
      ),
    );
}

async function middlewares(
  app: NestExpressApplication,
  appLoggerService: AppLoggerService,
): Promise<void> {
  app.use(
    (req, res, next) =>
      new RequestsLoggerMiddleware(
        appLoggerService,
      )
        .use(
          req,
          res,
          next,
        ),
  );

  const jwtProviderService =
    app
      .get(
        JwtProviderService,
      );

  app.use(
    (req, res, next) =>
      new ProtectedFilesMiddleware(
        jwtProviderService,
      )
        .use(
          req,
          res,
          next,
        ),
  );
}

async function run(
  app: NestExpressApplication,
  appLoggerService: AppLoggerService,
): Promise<void> {
  const appConfigsService =
    app
      .get(
        AppConfigsService,
      );
      if (!appConfigsService.isProduction) {
        mongoose.set('debug', true);
      }
  await app
    .listen(
      appConfigsService.appConfig.port,
    )
    .then(
      () => {
        appLoggerService
          .log(
            `'${appConfigsService.appConfig.name}' running on port ${appConfigsService.appConfig.port}`,
          );
      },
    );
}

async function hotReload(
  app: NestExpressApplication,
): Promise<void> {
  if (module.hot) {
    module
      .hot
      .accept();

    module
      .hot
      .dispose(
        () => app.close(),
      );
  }
}


bootstrap();