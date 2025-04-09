export class MediasUploadCommand {
  public constructor(
    public readonly file: Express.Multer.File,
    public readonly isProtected: boolean,
  ) { }
}