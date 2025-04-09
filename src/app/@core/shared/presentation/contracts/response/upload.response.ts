export class UploadResponseDto {
  private constructor(
    public readonly id: string,
    public readonly uniqueName: string,
    public readonly name: string,
    public readonly size: number,
    public readonly type: string,
    public readonly url: string,
    public readonly fullUrl: string,
    public readonly isProtected: boolean,
  ) { }

  public static create(
    id: string,
    uniqueName: string,
    name: string,
    size: number,
    type: string,
    url: string,
    fullUrl: string,
    isProtected: boolean,
  ): UploadResponseDto {
    return new UploadResponseDto(
      id,
      uniqueName,
      name,
      size,
      type,
      url,
      fullUrl,
      isProtected,
    );
  }
}
