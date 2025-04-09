import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersRepository } from 'src/app/features/users/persistence/repositories/users.repository';
import { TokenValidationResult } from './results/token-validation.result';

@Injectable()
export class JwtProviderService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) { }

  public async generateAccessToken(
    userId: string,
  ): Promise<string> {
    const user =
      await this
        .usersRepository
        .getById(
          userId,
        );

    const tokenPayload = {
      userId: userId,
      roles: [
        user.role,
      ],
    };

    const accessToken =
      await this
        .jwtService
        .signAsync(
          tokenPayload,
        );

    return accessToken;;
  }

  public verifyAccessToken(
    token: string,
  ): TokenValidationResult {
    try {
      if (token == null) {
        return new TokenValidationResult(
          false,
          null,
        );
      }

      const payload = this
        .jwtService
        .verify(
          token,
        );

      return new TokenValidationResult(
        true,
        payload,
      )
    }
    catch (exception) {
      return new TokenValidationResult(
        false,
        null,
      );
    }
  }
}
