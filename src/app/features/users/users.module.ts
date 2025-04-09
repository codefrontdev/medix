import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersRepository } from './persistence/repositories/users.repository';
import { UserSchemaFactory } from './persistence/factories/user-schema.factory';
import { UserFactory } from './application/factories/user.factory';
import { UsersUpsertHandler } from './application/commands/upsert/users-upsert.handler';
import { UsersCreatedHandler } from './application/events/created/users-created.handler';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserSchema } from './persistence/schemas/user.schema';
import { UsersGetAllHandler } from './application/queries/getAll/users-get-all.handler';
import { UsersGetHandler } from './application/queries/get/users-get.handler';
import { UsersDeleteHandler } from './application/commands/delete/users-delete.handler';
import { UsersVerifyHandler } from './application/commands/verify/users-verify.handler';
import { UserUpdateFactory } from './application/factories/user-update.factory';

@Module(
  {
    imports: [
      CqrsModule,
      MongooseModule.forFeature(
        [
          {
            name: UserSchema.name,
            schema:
              SchemaFactory
                .createForClass(
                  UserSchema,
                ),
          },
        ],
      ),
    ],
    providers: [
      UsersRepository,
      UserSchemaFactory,
      UserFactory,
      UserUpdateFactory,
      UsersUpsertHandler,
      UsersVerifyHandler,
      UsersDeleteHandler,
      UsersGetHandler,
      UsersGetAllHandler,
      UsersCreatedHandler,
    ],
    controllers: [
      UsersController,
    ],
    exports: [
      UsersRepository,
      UserSchemaFactory,
      UserFactory,
      UserUpdateFactory,
    ],
  },
)
export class UsersModule { }
