import { TendersGetResult } from "./tenders-get.result";

export class TendersResult {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly status?: string,
    public readonly type?: string
  ) { }

  public static createFromDomain(
    tender: TendersGetResult,
  ): TendersResult {
    return new TendersResult(
        tender.id,
        tender.title,
        tender.status,
        tender.type
    );
  }
}
