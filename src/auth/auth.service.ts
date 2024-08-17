import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  Login() {
    return {
      mgs: 'Your are sign in from service',
    };
  }

  async Register(dto: AuthDto) {
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
}
