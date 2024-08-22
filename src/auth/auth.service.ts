import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Users } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
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

  async login(dto: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user.isActive) {
      throw new ForbiddenException(
        'This account has not been activated. Please contact Administrator to activate immediately.',
      );

      return false;
    }

    if (!user) throw new ForbiddenException('The email address ');

    const passwordMatches = await argon.verify(user.hashedPassword, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Password incorrect');

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.hashedPassword;
    return this.loginToken(userWithoutPassword);
  }

  async loginToken(
    user: Omit<Users, 'hashPassword'>,
  ): Promise<{ user: Omit<Users, 'hashPassword'>; access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '48h',
      secret: secret,
    });

    return {
      user: user,
      access_token: token,
    };
  }

  // async delete(id: string) {
  //   const user = await this.prisma.users.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });

  //   if (!user) throw new Error('User not found');

  //   const updateData: any = {
  //     email: user.email,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     permission: user.permission,
  //     isActive: false,
  //   };

  //   return this.prisma.users.update({
  //     where: {
  //       id: id,
  //     },
  //     data: updateData,
  //   });
  // }
}
