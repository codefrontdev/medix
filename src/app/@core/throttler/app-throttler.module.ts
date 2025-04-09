import Joi from 'joi';

import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { appThrottlerTypes } from './app-throttler-types';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';


@Module(
  {
    imports: [
      ThrottlerModule
        .forRoot(
          appThrottlerTypes,
        ),
      // .forRootAsync(
      // 	{
      // 		imports: [
      // 			ConfigModule,
      // 		],
      // 		inject: [
      // 			ConfigService,
      // 		],
      // 		useFactory: (
      // 			config: ConfigService,
      // 		) => [
      // 				{
      // 					ttl: config.get('THROTTLE_TTL'),
      // 					limit: config.get('THROTTLE_LIMIT'),
      // 				},
      // 			],
      // 	},
      // ),
    ],
    providers: [
    ],
    exports: [
    ],
  },
)
export class AppThrottlerModule { }