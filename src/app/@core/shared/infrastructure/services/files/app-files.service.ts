/** @format */

import { Injectable } from "@nestjs/common";
import * as path from "path";
import { createWriteStream, rmdirSync, statSync } from "fs";
import { join } from "path";
import {
  existsSync,
  mkdirSync,
  unlinkSync,
  move,
  moveSync,
  copySync,
} from "fs-extra";
import { Media } from "src/app/features/medias/domain/entities/media";
import {
  getFileExtension,
  mediasConstants,
} from "src/app/features/medias/domain/constants/medias-constants";
import { ObjectId } from "mongodb";
import {
  createObjectId,
  fromObjectId,
} from "src/app/@core/utils/functions/mongo-functions";
import { getPublicDirectory } from "src/app/@core/utils/functions/miedas-functions";

@Injectable()
export class AppFilesService {
  constructor() {}

  public async uploadMultipleFiles(
    files: Express.Multer.File[],
    directoryPath: string = mediasConstants.paths.temp,
    isProtected: boolean = true
  ): Promise<Media[]> {
    if (!files || files.length === 0) {
      return [];
    }

    const rootPath = this.getRootPath(isProtected);

    this.createDirectory(rootPath);

    const combinedDirectoryPath = join(rootPath, directoryPath);

    this.createDirectory(combinedDirectoryPath);

    const medias: Media[] = [];

    for (const file of files) {
      if (!file || file.size === 0) {
        continue;
      }

      const fileName = file.originalname;
      const extension = getFileExtension(fileName);

      const mediaId = fromObjectId(createObjectId());

      const uniqueName = `${mediaId}${extension}`;

      const combinedFilePath = join(combinedDirectoryPath, uniqueName);

      const url = join(directoryPath, uniqueName);

      await new Promise<void>((resolve, reject) => {
        const stream = createWriteStream(combinedFilePath);

        stream.write(file.buffer);

        stream.end();

        stream.on("finish", () => resolve());

        stream.on("error", reject);
      });

      const media = this.createMedia(
        mediaId,
        url,
        uniqueName,
        fileName,
        file.size,
        file.mimetype,
        isProtected
      );

      medias.push(media);
    }

    return medias;
  }

  public async moveMultipleFiles(
    directoryPath: string,
    isProtected: boolean,
    medias: Media[]
  ): Promise<Media[]> {
    this.createDirectories(isProtected, directoryPath);

    const rootPath = this.getRootPath(isProtected);

    const combinedDestDirectoryPath = join(rootPath, directoryPath);

    const mediasResult: Media[] = [];

    for (const media of medias) {
      if (!media || !media.url) {
        continue;
      }

      const combinedSrcFilePath = join(rootPath, media.url);

      const combinedDestFilePath = join(
        combinedDestDirectoryPath,
        media.uniqueName
      );

      try {
        await move(combinedSrcFilePath, combinedDestFilePath);

        media.url = join(directoryPath, media.uniqueName);

        mediasResult.push(media);
      } catch (error) {
        console.error("Failed to move file:", error);
      }
    }

    return mediasResult;
  }

  async saveFileAsync(
    stream: NodeJS.ReadableStream,
    fileName: string,
    mimeType: string,
    directoryPath = mediasConstants.paths.temp,
    isProtected = false
  ): Promise<Media | null> {
    if (!stream) return null;

    const rootPath = this.getRootPath(isProtected);

    const combinedDirectoryPath = join(rootPath, directoryPath);

    this.createDirectory(combinedDirectoryPath);

    const mediaId = fromObjectId(createObjectId());

    const extension = getFileExtension(fileName);

    const uniqueName = `${mediaId}${extension}`;

    const combinedFilePath = join(combinedDirectoryPath, uniqueName);

    const url = join(directoryPath, uniqueName);

    try {
      const fileStream = createWriteStream(combinedFilePath);

      await new Promise<void>((resolve, reject) => {
        stream.pipe(fileStream).on("finish", resolve).on("error", reject);
      });

      const fileSize = statSync(combinedFilePath).size;

      const media = this.createMedia(
        mediaId,
        url,
        uniqueName,
        fileName,
        fileSize,
        mimeType,
        isProtected
      );

      return media;
    } catch (error) {
      console.error("Error saving file:", error);

      return null;
    }
  }

  public async deleteMultipleFiles(medias: Media[]): Promise<Media[]> {
    const recyclerBinPath = this.getRecyclePath();
    const mediasResult: Media[] = [];

    for (const media of medias) {
      if (!media || !media.fullUrl) {
        continue;
      }

      const rootPath = this.getRootPath(false);

      const sourceFilePath = path.resolve(rootPath, media.fullUrl);

      const destinationFilePath = join(recyclerBinPath, media.uniqueName);

      try {
        await move(sourceFilePath, destinationFilePath);

        // FIXME: Save after update
        media.url = join(mediasConstants.paths.recyclerBin, media.uniqueName);

        mediasResult.push(media);
      } catch (error) {
        console.error(`Failed to move file ${media.uniqueName}: ${error}`);
      }
    }

    return mediasResult;
  }

  public deleteFiles(
    directoryPath: string,
    isProtected: boolean,
    isPermanently: boolean,
    ...filePaths: string[]
  ): void {
    const rootPath = this.getRootPath(isProtected);

    const combinedDirectoryPath = join(rootPath, directoryPath);

    filePaths.forEach((filePath) => {
      if (!filePath) {
        return;
      }

      const combinedFilePath = join(combinedDirectoryPath, filePath);

      const isExist = existsSync(combinedFilePath);

      if (isExist) {
        if (isPermanently) {
          unlinkSync(combinedFilePath);
        } else {
          const recycleBinPath = this.getRecyclePath();

          const destPath = join(recycleBinPath, filePath);

          moveSync(combinedFilePath, destPath);
        }
      }
    });
  }

  public deleteDirectory(
    directoryPath: string,
    isProtected: boolean,
    isPermanently: boolean
  ): void {
    const rootPath = this.getRootPath(isProtected);

    const combinedDirectoryPath = join(rootPath, directoryPath);

    const isExist = existsSync(combinedDirectoryPath);

    if (isExist) {
      if (isPermanently) {
        rmdirSync(combinedDirectoryPath, {
          recursive: true,
        });
      } else {
        const recycleBinPath = this.getRecyclePath();

        const destPath = join(recycleBinPath, directoryPath);

        moveSync(combinedDirectoryPath, destPath);
      }
    }
  }

  public createDirectories(
    isProtected: boolean,
    ...directoriesPaths: string[]
  ): void {
    const rootPath = this.getRootPath(isProtected);

    directoriesPaths.forEach((directoryPath) => {
      const combinedDirectoryPath = join(rootPath, directoryPath);

      const isExist = existsSync(combinedDirectoryPath);

      if (!isExist) {
        mkdirSync(combinedDirectoryPath, {
          recursive: true,
        });
      }
    });
  }

  public renameFile(
    filePath: string,
    newName: string,
    isProtected: boolean
  ): boolean {
    const rootPath = this.getRootPath(isProtected);

    const combinedFilePath = join(rootPath, filePath);

    const isExist = existsSync(combinedFilePath);

    if (!isExist) {
      return false;
    }

    const oldName = path.basename(filePath);

    const directoryPath = combinedFilePath.replace(oldName, "");

    const combinedDestPath = join(directoryPath, newName);

    try {
      moveSync(combinedFilePath, combinedDestPath, {
        overwrite: true,
      });

      return true;
    } catch (error) {
      console.error("Failed to rename file:", error);

      return false;
    }
  }

  public copyFile(
    directoryPath: string,
    isProtected: boolean,
    srcUrl: string,
    destFileName: string
  ): boolean {
    if (!srcUrl || !destFileName) {
      return false;
    }

    const rootPath = this.getRootPath(isProtected);

    const combinedDirectoryPath = join(rootPath, directoryPath);

    this.createDirectory(combinedDirectoryPath);

    const combinedSrcFilePath = join(rootPath, srcUrl);

    const isExist = existsSync(combinedSrcFilePath);

    if (!isExist) {
      return false;
    }

    const combinedDestFilePath = join(rootPath, directoryPath, destFileName);

    try {
      copySync(combinedSrcFilePath, combinedDestFilePath);

      return true;
    } catch (error) {
      console.error("Failed to copy file:", error);

      return false;
    }
  }

  public moveFile(
    srcPath: string,
    destPath: string,
    shouldEncryptFile: boolean = false
  ): boolean {
    const isExist = existsSync(srcPath);

    if (isExist) {
      if (shouldEncryptFile) {
        // Call your encryption method here before moving
        // this.encryptFile(srcPath, destPath);
      } else {
        moveSync(srcPath, destPath, {
          overwrite: true,
        });
      }

      return true;
    }

    return existsSync(destPath);
  }

  public deleteToRecycleBin(srcPath: string, isDirectory: boolean): void {
    const recycleBinPath = this.getRecyclePath();

    const fileName = path.basename(srcPath);

    const destPath = join(recycleBinPath, fileName);

    if (isDirectory) {
      moveSync(srcPath, destPath, {
        overwrite: true,
      });
    } else {
      moveSync(srcPath, destPath, {
        overwrite: true,
      });
    }
  }

  public createAppDirectories(): void {
    this.createDirectories(false, ...mediasConstants.directories);

    this.createDirectories(true, ...mediasConstants.protectedDirectories);
  }

  private getRootPath(isProtected: boolean): string {
    const rootPath = getPublicDirectory();

    return isProtected ?
        join(rootPath, mediasConstants.paths.uploadsProtected)
      : join(rootPath, mediasConstants.paths.uploads);
  }

  private getRecyclePath(): string {
    const rootPath = this.getRootPath(false);

    return join(rootPath, mediasConstants.paths.recyclerBin);
  }

  private createDirectory(path: string): void {
    const isExist = existsSync(path);

    if (!isExist) {
      mkdirSync(path, {
        recursive: true,
      });
    }
  }

  private createMedia(
    id: string | null,
    url: string,
    uniqueName: string,
    name: string,
    size: number,
    type: string,
    isProtected: boolean
  ): Media {
    return Media.create(
      id,
      url,
      uniqueName,
      name,
      size,
      type,
      null,
      null,
      null,
      null,
      isProtected
    );
  }
}
