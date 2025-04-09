import { Injectable } from '@nestjs/common';
import { Tender } from '../../domain/entities/tender';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { TendersRepository } from '../../persistence/repositories/tenders.repository';
import { createObjectId, createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';
import { Product } from '../../domain/entities/tender-product';


@Injectable()
export class TenderFactory implements EntityFactory<Tender> {
  public constructor(
    private readonly tendersRepository: TendersRepository,
  ) { }

  public async save(
    id: string | null,
    title: string,
    minValue: number,
    value: number,
    endDate: Date,
    deliverDate: Date,
    type: string,
    status: string = null,
    categoriesIds: string[] = [],
    region: string = '',
    city: string = '',
    fileName: string = '',
    fileDescription: string = '',
    fileId: string = null,
    attachmentName: string = '',
    attachmentDescription: string = '',
    attachmentId: string = null,
    attachmentRequired: boolean = false,
    attachmentDeliverDays: number = null,
    receiveDocumentsType: string,
    Paylater: string,
    contactInfo: string = '',
    companyId: string,
    userId: string,
    products: Product[] = [],
    TenderNr: number=1000,
  ): Promise<Tender> {
    const isInsert = id === null;

    if (isInsert) {
      const entity =
        Tender.create(
          createObjectIdAsString(id),
          title,
          minValue,
          value,
          endDate,
          deliverDate,
          type,
          status,
          categoriesIds,
          null,
          region,
          city,
          fileName,
          fileDescription,
          fileId,
          attachmentName,
          attachmentDescription,
          attachmentId,
          attachmentRequired,
          attachmentDeliverDays,
          receiveDocumentsType,
          Paylater,
          contactInfo,
          companyId,
          userId,
          products,
          TenderNr 
        );

      await this.tendersRepository.insert(entity);

      return entity;
    }

    const foundEntity = await this.tendersRepository.getById(id);

    if (foundEntity == null) {
      return null;
    }

    foundEntity.title = title;
    foundEntity.minValue = minValue;
    foundEntity.value = value;
    foundEntity.endDate = endDate;
    foundEntity.deliverDate = deliverDate;
    foundEntity.type = type;
    foundEntity.status = status;
    foundEntity.categoriesIds = categoriesIds;
    foundEntity.region = region;
    foundEntity.city = city;
    foundEntity.fileName = fileName;
    foundEntity.fileDescription = fileDescription;
    foundEntity.fileId = fileId;
    foundEntity.attachmentName = attachmentName;
    foundEntity.attachmentDescription = attachmentDescription;
    foundEntity.attachmentId = attachmentId;
    foundEntity.attachmentRequired = attachmentRequired;
    foundEntity.attachmentDeliverDays = attachmentDeliverDays;
    foundEntity.receiveDocumentsType = receiveDocumentsType;
    foundEntity.Paylater = Paylater;
    foundEntity.contactInfo = contactInfo;
    foundEntity.companyId = companyId;
    foundEntity.products = products; // Update products

    const updatedEntity = await this.tendersRepository.getAndUpdate(
      {
        _id: createObjectId(id),
      },
      foundEntity,
    );

    return updatedEntity;
  }
}
