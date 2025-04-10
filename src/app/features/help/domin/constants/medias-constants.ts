import { extname } from "path";


const publicPath = 'public';
const uploadsPath = 'uploads';
const protectedPath = 'protected';
const recyclerBinPath = 'recyclerBin';
const uploadsProtected = `${uploadsPath}/${protectedPath}`;
const publicUploadsPath = `${publicPath}/${uploadsPath}`;
const publicUploadsProtectedPath = `${publicPath}/${uploadsPath}/${protectedPath}`;
const tempPath = 'temp';

const directoriesPaths =
  [
    recyclerBinPath,
    tempPath,
  ];

const protectedDirectoriesPaths =
  [
    tempPath,
  ];

export const mediasConstants = {
  paths: {
    public: publicPath,
    uploads: uploadsPath,
    protected: protectedPath,
    recyclerBin: recyclerBinPath,
    uploadsProtected: uploadsProtected,
    publicUploads: publicUploadsPath,
    publicUploadsProtected: publicUploadsProtectedPath,
    temp: tempPath,
  },
  directories: directoriesPaths,
  protectedDirectories: protectedDirectoriesPaths,
}

export function toProtectedPath(
  value: string,
): string {
  return `${protectedPath}/${value}`;
}

export function getFileExtension(
  path: string,
): string {
  return extname(
    path,
  );
}
