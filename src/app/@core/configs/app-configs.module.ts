import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { AppConfigsService } from "./app-configs.service";
import { ConfigModule } from "@nestjs/config";
import { envConstants } from "./values/env-constants";


@Module(
  {
    imports: [
      ConfigModule
        .forRoot(
          {
            isGlobal: true,
            expandVariables: true,
            envFilePath: `src/app/@core/configs/.env/.env.${process.env.NODE_ENV || envConstants.defaultEnv}`,
            // validate: AppConfigsService.validateConfig,
          },
        )
    ],
    providers: [
      AppConfigsService,
    ],
    exports: [
      AppConfigsService,
    ],
  },
)
export class AppConfigsModule { }