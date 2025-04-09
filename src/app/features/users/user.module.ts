import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersRepository } from './persistence/repositories/users.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserSchema } from './persistence/schemas/user.schema';
import { UserSchemaFactory } from './persistence/factories/user-schema.factory';
import { UserFactory } from './application/factories/user.factory';
 // Assuming you have a User repository

@Module({
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
    UserService,
    UsersRepository,
    UserSchemaFactory,
    UserFactory,
    
  ],
  exports: [UserService],
})
export class UserModule {}
