import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3_BUCKET, s3Client } from "src/app/@core/configs/s3.config";
import { v4 as uuidv4 } from "uuid";

export class S3UploadService {
  /**
   * Uploads a file to S3 in a specified folder
   * @param file - The file to upload
   * @param folderPath - The folder path to store the file (e.g., `companyId/images`)
   * @returns The public URL of the uploaded file
   */
  public static async uploadFile(file: Express.Multer.File, folderPath: string): Promise<string> {
    // Construct file key with folder path
    const fileKey = `${folderPath}/${uuidv4()}-${file.originalname}`;

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      // Return the file URL
      return `https://${S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3.");
    }
  }
}
