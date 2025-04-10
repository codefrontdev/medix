import { Module } from '@nestjs/common';
import { HelpController } from './help.controller';
import { HelpService } from './help.service';
// import { UserService } from '../users/user.service';
import { UsersModule } from '../users/users.module'; // Import the module containing UserService

@Module({
  imports: [UsersModule], // Ensure the module is imported
  controllers: [HelpController],
  providers: [HelpService, 
    // UserService
  ], // Ensure UserService is a provider
})
export class HelpModule {}
