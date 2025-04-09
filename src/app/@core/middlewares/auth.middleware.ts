import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtProviderService } from 'src/app/features/auth/application/services/jwt-provider.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public constructor(
    private readonly jwtProviderService: JwtProviderService,
  ) { }

  public use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): any {
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
