export class Attachment {
    public readonly name: string;
    public readonly description: string;
    public readonly fileId: string | null;
  
    constructor(name: string, description: string, fileId: string | null) {
      this.name = name;
      this.description = description;
      this.fileId = fileId;
    }
  }
  