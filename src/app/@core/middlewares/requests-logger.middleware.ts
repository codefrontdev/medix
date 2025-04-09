import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { mediasConstants } from 'src/app/features/medias/domain/constants/medias-constants';
import { AppLoggerService } from '../logger/app-logger.service';

@Injectable()
export class RequestsLoggerMiddleware implements NestMiddleware {
  public constructor(
    private readonly appLoggerService: AppLoggerService,
  ) { }

  public use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): any {
    this
      .appLoggerService
      .log(
        `${req.method} ====> ${req.originalUrl}`,
      );

    next();
  }
}
