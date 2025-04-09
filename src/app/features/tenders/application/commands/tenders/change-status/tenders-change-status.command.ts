export class TendersChangeStatusCommand {
  public constructor(
    public readonly id: string,
    public readonly status: string,
    public readonly tenderQuotationId?: string,
    public readonly userId: string = '',
  ) { }
}
