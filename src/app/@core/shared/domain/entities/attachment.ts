export class Attachment {
    public readonly name?: string;
    public readonly description?: string;
    public readonly fileId?: string | null; // Make this optional
    public readonly filepath?: string;
  
    constructor(name?: string, description?: string, fileId?: string | null, filepath?: string) {
      this.name = name;
      this.description = description;
      this.fileId = fileId;
      this.filepath = filepath;
    }
  }
  