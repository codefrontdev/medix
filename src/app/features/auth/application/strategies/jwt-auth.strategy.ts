import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppConfigsService } from 'src/app/@core/configs/app-configs.service';
import { UserTokensRepository } from '../../persistence/repositories/user-tokens.repository';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private readonly userTokensRepository: UserTokensRepository,
    private readonly appConfigsService: AppConfigsService,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: appConfigsService.jwtConfig.secret,
      },
    );
  }

  public async validate(
    payload: any,
  ): Promise<any> {
    const { userId, roles } = payload;

    const userToken =
      await this
        .userTokensRepository
        .getByUserId(
          userId,
        );

    if (userToken === null) {
      return null;
    }

    return payload;
  }
}