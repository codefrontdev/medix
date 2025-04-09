import { Module } from '@nestjs/common';
// ...existing code...
import { UserModule } from './features/users/user.module';

@Module({
  imports: [
    // ...existing code...
    UserModule,
  ],
  // ...existing code...
})
export class AppModule {}
