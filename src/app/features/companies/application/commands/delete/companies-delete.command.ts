export class CompaniesDeleteCommand {
  public constructor(
    public readonly id: string,
    public readonly userId: string,
  ) { }
}