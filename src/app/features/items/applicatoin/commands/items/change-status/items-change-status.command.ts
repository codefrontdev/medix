export class ItemsChangeStatusCommand {
  public constructor(
    public readonly id: string,
    public readonly status: string,
    public readonly userId: string = '', 
  ) { }
}