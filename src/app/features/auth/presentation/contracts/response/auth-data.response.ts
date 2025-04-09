import { UsersInfoResponse } from "src/app/features/users/presentation/contracts/response/users-info.response";
import { AuthTokensResponse } from "./auth-tokens.response";

export class AuthDataResponse {
  private constructor(
    public readonly user: UsersInfoResponse,
    public readonly tokens: AuthTokensResponse,
  ) { }

  public static create(
    user: UsersInfoResponse,
    tokens: AuthTokensResponse,
  ): AuthDataResponse {
    return new AuthDataResponse(
      user,
      tokens,
    );
  }
}
