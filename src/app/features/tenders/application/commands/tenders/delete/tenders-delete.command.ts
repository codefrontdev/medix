export class TendersDeleteCommand {
  public constructor(
    public readonly id: string,
    public readonly userId: string,
  ) { }
}