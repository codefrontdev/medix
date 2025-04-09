export class UsersGetResponse {
  private constructor(
    public readonly id: string,
    public readonly nickName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly isEmailConfirmed: boolean,
    public readonly isPhoneNumberConfirmed: boolean,
    public readonly role: string,
    public readonly gender?: string,
    public readonly accountType?: string,
    public readonly region?: string,
    public readonly city?: string,
    public readonly address?: string,
    public readonly identityType?: string,
    public readonly identityNo?: string,
    public readonly residenceNo?: string,
    public readonly dateOfBirth?: Date,
    public readonly isVerified?: boolean,
  ) { }
}