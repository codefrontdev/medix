import { LoggerService, Injectable } from '@nestjs/common';

import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { AppConfigsService } from '../configs/app-configs.service';

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly logger: winston.Logger;

  public constructor(
    private readonly appConfigsService: AppConfigsService,
  ) {
    this.logger =
      winston
        .createLogger(
          {
            transports: this.appConfigsService.isProduction ?
              [
                this.getConsoleTransport(),
              ] :
              [
                this.getConsoleTransport(),
                // this.getFileTransport(),
              ],
          },
        );
  }

  public log(
    message: string,
  ): void {
    this
      .logger
      .log(
        'info',
        message,
      );
  }

  public error(
    message: string,
    stackTrace?: string,
  ): void {
    this
      .logger
      .log(
        'error',
        message,
        {
          stackTrace,
        },
      );
  }

  public warn(
    message: string,
  ): void {
    this
      .logger
      .log(
        'warn',
        message,
      );
  }

  public debug(
    message: string,
  ): void {
    this
      .logger
      .log(
        'debug',
        message,
      );
  }

  public verbose(
    message: string,
  ): void {
    this
      .logger
      .log(
        'verbose',
        message,
      );
  }

  private getConsoleTransport(): winston.transport {
    return new winston
      .transports
      .Console(
        {
          format:
            winston
              .format
              .combine(
                winston.format.timestamp(),
                winston.format.json(),
              ),
        },
      );
  }

  private getFileTransport(): winston.transport {
    return new winston
      .transports
      .DailyRotateFile(
        {
          dirname: './logs',
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format:
            winston
              .format
              .combine(
                winston.format.timestamp(),
                winston.format.json(),
              ),
        },
      );
  }
}
