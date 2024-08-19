import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async Login(dto: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordMatches = await argon.verify(user.hashedPassword, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async Register(dto: RegisterDto) {
    const hashedPassword = await argon.hash(dto.password);
    const user = await this.prisma.users.create({
      data: {
        email: dto.email,
        hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        permission: dto.permission,
        isActive: dto.isActive,
      },
    });
    return user;
  }

  async signToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
