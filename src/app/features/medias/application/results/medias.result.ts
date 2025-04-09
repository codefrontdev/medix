export class MediasResult {
  private constructor(
    public readonly id: string,
    public readonly url: string,
    public readonly uniqueName: string,
    public readonly name: string,
    public readonly size: number,
    public readonly type: string,
    public readonly isProtected: boolean,
    public readonly fullUrl: string,
    public readonly userId: string, // Added userId
    public readonly companyId: string, // Added companyId
    public readonly source: string, // Added source
    public readonly sourceType: string // Added sourceType
  ) { }

  public static create(
    id: string,
    url: string,
    uniqueName: string,
    name: string,
    size: number,
    type: string,
    isProtected: boolean,
    fullUrl: string,
    userId: string, // Added userId
    companyId: string, // Added companyId
    source: string, // Added source
    sourceType: string // Added sourceType
  ): MediasResult {
    return new MediasResult(
      id,
      url,
      uniqueName,
      name,
      size,
      type,
      isProtected,
      fullUrl,
      userId, // Added userId
      companyId, // Added companyId
      source, // Added source
      sourceType // Added sourceType
    );
  }
}
