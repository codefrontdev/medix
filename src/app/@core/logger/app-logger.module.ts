import { Module } from '@nestjs/common';

import 'winston-daily-rotate-file';
import { AppLoggerService } from './app-logger.service';
import { AppConfigsModule } from '../configs/app-configs.module';

@Module(
  {
    imports: [
      AppConfigsModule,
    ],
    providers: [
      AppLoggerService,
    ],
    exports: [
      AppLoggerService,
    ],
  },
)
export class AppLoggerModule { }
