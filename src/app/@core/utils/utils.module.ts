import { Module } from '@nestjs/common';
import { AppDateUtilsService } from './services/app-date-utils.service';

@Module(
  {
    imports: [
    ],
    providers: [
      AppDateUtilsService,
    ],
    controllers: [
    ],
    exports: [
      AppDateUtilsService,
    ],
  },
)
export class UtilsModule { }
