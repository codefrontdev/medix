import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { ObjectId } from 'mongodb';
import { AppConfigsService } from 'src/app/@core/configs/app-configs.service';
import { SentCodeProviderService } from '../services/sent-code-provider.service';
import { SentCodeEnum } from '../../@core/values/enums/sent-code.enum';
import { UserCodesRepository } from '../../persistence/repositories/user-codes.repository';
import { UserCode } from '../../domain/entities/user-code';
import { AppDateUtilsService } from 'src/app/@core/utils/services/app-date-utils.service';
import { createObjectId, createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class UserCodeFactory implements EntityFactory<UserCode> {
  public constructor(
    private readonly sentCodeProviderService: SentCodeProviderService,
    private readonly appConfigsService: AppConfigsService,
    private readonly userCodesRepository: UserCodesRepository,
    private readonly appDateUtilsService: AppDateUtilsService,
  ) { }

  public async save(
    sentCodeEnum: SentCodeEnum,
    sentTo: string,
    userId: string,
  ): Promise<UserCode> {
    const codeToSend =
      await this
        .sentCodeProviderService
        .generateCode(
          sentCodeEnum,
        );

    const expirationDate =
      this
        .appDateUtilsService
        .getCurrentDateWithDuration(
          this.appConfigsService.sentCodeConfig.expiresIn,
        );

    const foundUserCode =
      await this.userCodesRepository
        .get(
          {
            userId:
              createObjectId(
                userId,
              ),
            type: sentCodeEnum.type,
          },
        );

    const userCode =
      new UserCode(
        createObjectIdAsString(
          foundUserCode?._id,
        ),
        codeToSend,
        sentCodeEnum.type,
        sentTo,
        userId,
        expirationDate,
      );

    if (foundUserCode === null) {
      await this
        .userCodesRepository
        .insert(
          userCode,
        );

      return userCode;
    }

    await this
      .userCodesRepository
      .getAndReplaceById(
        foundUserCode._id,
        userCode,
      );

    return userCode;
  }
}