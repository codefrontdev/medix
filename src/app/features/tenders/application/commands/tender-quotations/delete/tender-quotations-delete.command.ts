export class TenderQuotationsDeleteCommand {
  public constructor(
    public readonly id: string,
    public readonly userId: string,
  ) { }
}