/** @format */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AuthInfoLogoutCommand } from "./auth-info-logout.command";
import { UserTokensRepository } from "src/app/features/auth/persistence/repositories/user-tokens.repository";
import { AuthInfoSuccess } from "../../../domain/successes/auth-info-succes";
import { createObjectId } from "src/app/@core/utils/functions/mongo-functions";

@CommandHandler(AuthInfoLogoutCommand)
export class AuthInfoLogoutHandler
  implements ICommandHandler<AuthInfoLogoutCommand, AppResult<null>>
{
  public constructor(
    private readonly userTokensRepository: UserTokensRepository
  ) {}

  public async execute(
    command: AuthInfoLogoutCommand
  ): Promise<AppResult<null>> {
    const deletedUserToken = await this.userTokensRepository.getAndDelete({
      userId: createObjectId(command.userId),
    });
    

    if (deletedUserToken === null) {
      throw AppResult.createSuccess(
        AuthInfoSuccess.userAlreadyLoggedOut.key,
        AuthInfoSuccess.userAlreadyLoggedOut.message,
        null
      );
    }

    return AppResult.createSuccess(null, null, null);
  }
}
