import { AggregateRoot } from "@nestjs/cqrs";

export class UserCode extends AggregateRoot {
  public constructor(
    public readonly _id: string,
    public readonly code: string,
    public readonly type: string,
    public readonly sentTo: string,
    public readonly userId: string,
    public readonly expirationDate: Date,
  ) {
    super();
  }
}