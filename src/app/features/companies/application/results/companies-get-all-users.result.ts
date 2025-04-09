export class CompaniesUsersGetAllResult {
    private constructor(
      public readonly userId: string,
      public readonly companyId: string,
      public readonly Role: string,
      public readonly nickName: string = '',
      public readonly email: string,
      public readonly nameAr: string,
    ) { }
  
    public static create(
        userId: string,
        companyId: string,
        Role: string,
        nickName: string,
        email: string,
        nameAr: string,
    ): CompaniesUsersGetAllResult {
      return new CompaniesUsersGetAllResult(
        userId,
        companyId,
        Role,
        nickName,
        email,
        nameAr,
      );
    }
}
