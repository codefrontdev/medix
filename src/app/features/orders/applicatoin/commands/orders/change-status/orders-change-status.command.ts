export class OrdersChangeStatusCommand {
  public constructor(
    public readonly id: string,
    public readonly status: string,
    public readonly tenderQuotationId?: string,
    public readonly OrderId?: string,
    public readonly userId: string = '',
  ) { }
}
