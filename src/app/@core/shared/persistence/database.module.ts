import { Module } from '@nestjs/common';
import { AppConfigsModule } from '../../configs/app-configs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigsService } from '../../configs/app-configs.service';

@Module(
  {
    imports: [
      AppConfigsModule,
      MongooseModule.forRootAsync(
        {
          imports: [
            AppConfigsModule,
          ],
          inject: [
            AppConfigsService,
          ],
          useFactory: async (
            appConfigsService: AppConfigsService,
          ) => {
            try {
              const uri = appConfigsService.databaseConfig.uri;

              console.
                log(
                  'Connecting to MongoDB with URI:',
                  uri,
                );

              return {
                uri,
              };

            } catch (error) {
              console
                .error(
                  'Error connecting to MongoDB:',
                  error,
                );

              throw error;
            }
          },
        },
      ),
    ],
    providers: [],
    exports: [],
  },
)
export class DatabaseModule { }
