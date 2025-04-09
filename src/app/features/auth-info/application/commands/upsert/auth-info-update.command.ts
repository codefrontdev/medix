export class AuthInfoUpdateCommand {
  public constructor(
    public readonly id: string,
    public readonly nickName: string,
    public readonly phoneNumber: string,
    public readonly gender?: string,
    public readonly accountType?: string,
    public readonly region?: string,
    public readonly city?: string,
    public readonly address?: string,
    public readonly identityType?: string,
    public readonly identityNo?: string,
    public readonly residenceNo?: string,
    public readonly dateOfBirth?: Date,
  ) { }
}