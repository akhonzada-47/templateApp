import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariables } from '../env.validation';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    const jwtSecret = configService.get('JWT_SECRET');
    // console.log("JWT_SECRET:", jwtSecret);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // console.log(payload);
    const { email } = payload;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
