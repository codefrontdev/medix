import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { MediasUploadCommand } from "./medias-upload.command";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { MediasRepository } from "../../../persistence/repositories/medias.repository";
import { NotFoundException } from "@nestjs/common";
import { MediaFactory } from "../../factories/media.factory";
import { MediasResult } from "../../results/medias.result";
import { AppFilesService } from "src/app/@core/shared/infrastructure/services/files/app-files.service";
import { mediasConstants } from "../../../domain/constants/medias-constants";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";

@CommandHandler(MediasUploadCommand)
export class MediasUploadHandler
  implements ICommandHandler<MediasUploadCommand, AppResult<MediasResult>> {
  public constructor(
    private readonly appFilesService: AppFilesService,
    private readonly mediasRepository: MediasRepository,
  ) { }

  public async execute(
    command: MediasUploadCommand,
  ): Promise<AppResult<MediasResult>> {
    const medias =
      await this.
        appFilesService
        .uploadMultipleFiles(
          [
            command.file,
          ],
          mediasConstants.paths.temp,
          command.isProtected,
        );

    if (medias === null || medias.length == 0) {
      return AppResult
        .createError(
          AppErrors
            .nullValue(
              'medias',
            ),
        );
    }

    const insertedMedia = medias[0];

    await this
      .mediasRepository
      .insert(
        insertedMedia,
      );

    const resultData =
      MediasResult
        .create(
          insertedMedia._id,
          insertedMedia.url,
          insertedMedia.uniqueName,
          insertedMedia.name,
          insertedMedia.size,
          insertedMedia.type,
          insertedMedia.isProtected,
          insertedMedia.fullUrl,
        )

    return AppResult
      .createSuccess<MediasResult>(
        null,
        null,
        resultData,
      );
  }
}