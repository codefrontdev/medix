import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { MediasRepository } from "../../../persistence/repositories/medias.repository";
import { AppResult } from "src/app/@core/shared/domain/shared/app-result";
import { AppErrors } from "src/app/@core/shared/domain/errors/app-errors";
import { MediasGetQuery } from "./medias-get.query";
import { MediasResult } from "../../results/medias.result";

@QueryHandler(MediasGetQuery)
export class MediasGetHandler
  implements ICommandHandler<MediasGetQuery, AppResult<MediasResult>> {
  public constructor(
    private readonly mediasRepository: MediasRepository,
  ) { }

  public async execute(
    query: MediasGetQuery,
  ): Promise<AppResult<MediasResult>> {
    const entity = await this.mediasRepository.getById(query.id);

    if (entity === null) {
      throw AppResult.createError(AppErrors.nullValue('object'));
    }

    // Updated to include userId, companyId, source, and sourceType
    const resultData = MediasResult.create(
      entity._id.toString(), // Convert ObjectId to string
      entity.url,
      entity.uniqueName,
      entity.name,
      entity.size,
      entity.type,
      entity.isProtected,
      entity.fullUrl,
      entity.userId.toString(), // Convert ObjectId to string
      entity.companyId.toString(), // Convert ObjectId to string
      entity.source.toString(), // Convert ObjectId to string
      entity.sourceType
    );

    return AppResult.createSuccess<MediasResult>(null, null, resultData);
  }
}
