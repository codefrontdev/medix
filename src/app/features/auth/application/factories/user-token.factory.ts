import { Injectable } from '@nestjs/common';
import { UserTokensRepository } from '../../persistence/repositories/user-tokens.repository';
import { EntityFactory } from 'src/app/@core/shared/persistence/factories/entity.factory';
import { UserToken } from '../../domain/entities/user-token';
import { ObjectId } from 'mongodb';
import { AppConfigsService } from 'src/app/@core/configs/app-configs.service';
import { v4 as uuidv4 } from 'uuid'
import { JwtProviderService } from '../services/jwt-provider.service';
import { AppDateUtilsService } from 'src/app/@core/utils/services/app-date-utils.service';
import { createObjectId, createObjectIdAsString } from 'src/app/@core/utils/functions/mongo-functions';

@Injectable()
export class UserTokenFactory implements EntityFactory<UserToken> {
  public constructor(
    private readonly jwtProviderService: JwtProviderService,
    private readonly appConfigsService: AppConfigsService,
    private readonly userTokensRepository: UserTokensRepository,
    private readonly appDateUtilsService: AppDateUtilsService,
  ) { }

  public async save(
    userId: string,
  ): Promise<UserToken> {
    const accessToken =
      await this
        .jwtProviderService
        .generateAccessToken(
          userId,
        );

    const refreshToken = uuidv4();

    const expirationDate =
      this
        .appDateUtilsService
        .getCurrentDateWithDuration(
          this.appConfigsService.jwtConfig.refreshExpiresIn,
        );

    const foundUserToken =
      await this.userTokensRepository
        .get(
          {
            userId:
              createObjectId(
                userId,
              ),
          },
        );

    const entity =
      new UserToken(
        createObjectIdAsString(
          foundUserToken?._id,
        ),
        accessToken,
        refreshToken,
        userId,
        expirationDate,
      );

    if (foundUserToken === null) {
      await this
        .userTokensRepository
        .insert(
          entity,
        );

      return entity;
    }

    await this
      .userTokensRepository
      .getAndReplaceById(
        foundUserToken._id,
        entity,
      );

    return entity;
  }
}