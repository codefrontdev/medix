import { UsersInfoResult } from "src/app/features/users/application/results/users-info.result";
import { AuthTokensResult } from "./auth-tokens.result";

export class AuthDataResult {
  private constructor(
    public readonly user: UsersInfoResult,
    public readonly tokens: AuthTokensResult,
  ) { }

  public static create(
    user: UsersInfoResult,
    tokens: AuthTokensResult,
  ): AuthDataResult {
    return new AuthDataResult(
      user,
      tokens,
    );
  }
}