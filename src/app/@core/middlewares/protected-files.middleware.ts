import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtProviderService } from 'src/app/features/auth/application/services/jwt-provider.service';
import { mediasConstants } from 'src/app/features/medias/domain/constants/medias-constants';

@Injectable()
export class ProtectedFilesMiddleware implements NestMiddleware {
  public constructor(
    private readonly jwtProviderService: JwtProviderService,
  ) { }

  public use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): any {
    const url = req.originalUrl;

    const isProtected =
      url
        .includes(
          mediasConstants.paths.protected,
        );

    if (!isProtected) {
      next();

      return;
    }

    const token =
      req
        .headers
        .authorization
        ?.split(
          ' ',
        )[1];

    const result =
      this
        .jwtProviderService
        .verifyAccessToken(
          token,
        );

    if (!result.isValid) {
      throw new UnauthorizedException();
    }

    next();
  }
}
