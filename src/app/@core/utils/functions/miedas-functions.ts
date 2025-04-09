import { join } from "path";
import { mediasConstants } from "src/app/features/medias/domain/constants/medias-constants";

export function getPublicDirectory(): string {
  return join(
    __dirname,
    '..',
    mediasConstants.paths.public,
  );
}

export function getUploadsPathInPublicDirectory(
  path: string,
): string {
  return join(
    getPublicDirectory(),
    mediasConstants.paths.uploads,
    path,
  );
}