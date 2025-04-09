export class Invoice {
  constructor(
    public readonly fileName: string,
    public readonly companyId: string,
    public readonly createdDate: Date,
    public readonly userId: string,
    public readonly enVersion: string, // English Invoice S3 URL
    public readonly arVersion: string // Arabic Invoice S3 URL
  ) {}
}