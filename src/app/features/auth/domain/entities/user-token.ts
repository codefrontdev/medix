import { AggregateRoot } from "@nestjs/cqrs";

export class UserToken extends AggregateRoot {
  public constructor(
    public readonly _id: string,
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly userId: string,
    public readonly expirationDate: Date,
  ) {
    super();
  }
}