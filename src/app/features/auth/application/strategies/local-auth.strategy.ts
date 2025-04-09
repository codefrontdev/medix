import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private readonly authService: AuthService,
  ) {
    super(
      // {
      //   usernameField: 'email',
      //   passwordField: 'password',
      // },
    );
  }

  public async validate(
    username: string,
    password: string,
  ): Promise<any> {
    const user =
      await this
        .authService
        .validateUser(
          username,
          password,
        );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}