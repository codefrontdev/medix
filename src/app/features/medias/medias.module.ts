import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { MediaSchema } from './persistence/schemas/media.schema';
import { MediasRepository } from './persistence/repositories/medias.repository';
import { MediaSchemaFactory } from './persistence/factories/media-schema.factory';
import { MediasController } from './presentation/controllers/medias.controller';
import { MediasUploadHandler } from './application/commands/upload/medias-upload.handler';
import { MediaFactory } from './application/factories/media.factory';
import { InfrastructureModule } from 'src/app/@core/shared/infrastructure/infrastructure.module';
import { MediasGetHandler } from './application/queries/get/medias-get.handler';
import { AuthModule } from '../auth/auth.module';

@Module(
  {
    imports: [
      AuthModule,
      InfrastructureModule,

      CqrsModule,
      MongooseModule.forFeature(
        [
          {
            name: MediaSchema.name,
            schema:
              SchemaFactory
                .createForClass(
                  MediaSchema,
                ),
          },
        ],
      ),
    ],
    providers: [
      MediasRepository,
      MediaSchemaFactory,
      MediaFactory,
      MediasController,
      MediasUploadHandler,
      MediasGetHandler,
    ],
    controllers: [
      MediasController,
    ],
    exports: [
      MediaFactory,
    ],
  },
)
export class MediasModule { }
