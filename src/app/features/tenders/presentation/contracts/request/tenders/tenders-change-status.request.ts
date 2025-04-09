import { IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { TenderStatusEnum } from '../../../../domain/constants/enums/tender-status.enum';

export class TendersChangeStatusRequest {
  @IsMongoId()
  @IsOptional()
  public readonly id?: string;

  @IsEnum(TenderStatusEnum)
  @IsOptional()
  public readonly status?: TenderStatusEnum;

  @IsMongoId()
  @IsOptional()
  public readonly tenderQuotationId?: string;
}