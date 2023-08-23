import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

  async signIn(emailAdress: string, pass: string): Promise<any> {
    const user      = await this.usersService.findUserCredetials(emailAdress);
    const isMatch   = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const { _id, email, role }        = user;
    const token: string               = await this.jwtService.signAsync({ _id, email, role });

    return token;
  }
}
