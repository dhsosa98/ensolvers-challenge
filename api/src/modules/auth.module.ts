import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/auth.jwt.strategy';
import { UsersModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategies/auth.local.strategy';
import { AuthController } from 'src/controllers/auth.controller';
import { DeviceProvider } from 'src/providers/device.provider';
import { DeviceService } from 'src/services/device.service';
/* eslint-disable  */
require('dotenv').config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JTW_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, DeviceService, ...DeviceProvider],
  exports: [AuthService, ...DeviceProvider],
})
export class AuthModule {}