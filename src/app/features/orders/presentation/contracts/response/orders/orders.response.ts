export class OrdersResponse {
    private constructor(
      public readonly id: string,
      public readonly title: string,
      public readonly status?: string,
      public readonly type?: string
    ) { }
  }
  