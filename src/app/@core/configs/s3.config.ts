import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION, // Add your region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "", // Add your access key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "", // Add your secret key
  },
});

export const S3_BUCKET = process.env.AWS_S3_BUCKET || ""; // Add your bucket name