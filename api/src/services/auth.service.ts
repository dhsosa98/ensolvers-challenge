import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dtos/user.dto';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';
import { DeviceService } from './device.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private deviceService: DeviceService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }
    const isValid = await bcrypt.compare(pass, user?.password);
    if (isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.dataValues.username,
      sub: user.dataValues.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserDto) {
    return await this.usersService.create(user);
  }

  async signUpWithGoogle(token: string, user: any) {
    const userDB = await this.usersService.signWithGoogle(token, user) as any;
    return {
      access_token: this.jwtService.sign({ username: userDB?.dataValues?.username, sub: userDB?.dataValues?.id }),
      user: userDB?.dataValues?.username,
    }
  }

  async registerFdcToken(userId: number, token: string) {
    return await this.deviceService.registerFdcToken(userId, token);
  }
}
