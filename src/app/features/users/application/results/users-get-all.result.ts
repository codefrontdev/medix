export class UsersGetAllResult {
  private constructor(
    public readonly id: string,
    public readonly nickName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly role: string,
    public readonly gender?: string,
    public readonly isVerified?: boolean,
  ) { }

  public static create(
    id: string,
    nickName: string,
    email: string,
    phoneNumber: string,
    role: string,
    gender?: string,
    isVerified?: boolean,
  ): UsersGetAllResult {
    return new UsersGetAllResult(
      id,
      nickName,
      email,
      phoneNumber,
      role,
      gender,
      isVerified,
    );
  }
}