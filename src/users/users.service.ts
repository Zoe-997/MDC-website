import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const userAll = await this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        permission: true,
        isActive: true,
        hashedPassword: false,
      },
    });
    return userAll;
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        permission: true,
        isActive: true,
        hashedPassword: false,
      },
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new Error('User not found');

    if (updateUserDto.password) {
      const isMatch = await argon.verify(user.hashedPassword, updateUserDto.password);
      if (isMatch) {
        return 'New password is the same as the old password';
      }
      updateUserDto.password = await argon.hash(updateUserDto.password);
    }

    const updateData: any = { ...updateUserDto };
    if (updateUserDto.password) {
      updateData.hashedPassword = updateUserDto.password;
      delete updateData.password;
    }

    return this.prisma.users.update({
      where: {
        id: id,
      },
      data: updateData,
      select: {
        email: true,
        firstName: true,
        lastName: true,
        permission: true,
        isActive: true,
        hashedPassword: false,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
