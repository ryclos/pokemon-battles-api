import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConfig } from '../auth.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: any): Promise<User> {
    // Dans les fait normalement à cause du user service on renvoit un Userdocument
    const user = await this.userService.findOneByUserName(payload.sub);
    if (!user) {
      throw new UnauthorizedException(`Valid jwt but unknown user...`);
    }
    return user;
  }
}
