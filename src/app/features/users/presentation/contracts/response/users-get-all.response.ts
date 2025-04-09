export class UsersGetAllResponse {
  private constructor(
    public readonly id: string,
    public readonly nickName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly role: string,
    public readonly gender?: string,
    public readonly isVerified?: boolean,
  ) { }
}