export class TransformsChangeStatusCommand {
  public constructor(
    public readonly id: string,
    public readonly status: string,
    public readonly transformRequest?: Boolean,
    public readonly withdrawRequest?: Boolean,
  ) { }
}