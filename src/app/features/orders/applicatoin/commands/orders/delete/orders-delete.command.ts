export class OrdersDeleteCommand {
  public constructor(
    public readonly id: string,
    public readonly userId: string,
  ) { }
}