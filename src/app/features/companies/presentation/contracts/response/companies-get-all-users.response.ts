export class CompaniesGetAllUsersResponse {
  private constructor(
      public readonly id: string,
      public readonly nickName: string,
      public readonly email?: string,
      public readonly Role?: string,
  ) { }

  // Static factory method
  public static create(
      id: string,
      nickName: string,
      email?: string,
      Role?: string,
  ): CompaniesGetAllUsersResponse {
      return new CompaniesGetAllUsersResponse(id, nickName, email, Role);
  }
}
