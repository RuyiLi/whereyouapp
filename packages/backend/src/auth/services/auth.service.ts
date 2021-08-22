import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../database/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateUser(emailOrUsername: string, password: string) {
    const user = await this.userService.findByEmailOrUsername(emailOrUsername);
    if (user && (await this.hashService.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        email: user.email,
        username: user.username,
      }),
    };
  }
}
