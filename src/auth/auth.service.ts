import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<unknown> {
    // Validate username password
    // Generate jwt payload form user
    // Sign and return jwt
    throw new Error('implement');
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userService.findOneByUserName(username);
    return user && (await bcrypt.compare(password, user.passwordHash));
  }
}
