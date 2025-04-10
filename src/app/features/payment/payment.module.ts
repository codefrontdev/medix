/** @format */

import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
// import { UserService } from '../users/user.service';
import { UsersModule } from "../users/users.module";
import {
  PaylatRequest,
  PaylatRequestSchema,
} from "./models/paylat-request.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: PaylatRequest.name, schema: PaylatRequestSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    // UserService
  ],
})
export class PaymentModule {}
