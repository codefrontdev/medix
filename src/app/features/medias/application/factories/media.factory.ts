import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { ObjectId } from "mongodb";
import { Media } from '../../domain/entities/media';
import { MediasRepository } from '../../persistence/repositories/medias.repository';
import { createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class MediaFactory implements EntityFactory<Media> {
  public constructor(
    private readonly mediasRepository: MediasRepository,
  ) { }

  public async save(
    id: string | null,
    url: string,
    uniqueName: string,
    name: string,
    size: number,
    type: string,
    isProtected: boolean,
    userId: string, // Added userId
    companyId: string, // Added companyId
    source: string, // Added source
    sourceType: string // Added sourceType
  ): Promise<Media> {
    const entity = new Media(
      createObjectIdAsString(id),
      url,
      uniqueName,
      name,
      size,
      type,
      createObjectIdAsString(userId), // Added userId
      createObjectIdAsString(companyId), // Added companyId
      sourceType, // Added sourceType
      createObjectIdAsString(source), // Added source
      isProtected,
      0,
      true,      
      null,
      null,
      null
    );

    await this.mediasRepository.insert(entity);

    return entity;
  }
}
