import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

// @Get('users/all')
//   GetAllUsers() {
//     return this.authService.findAll();
//   }

//   @Get('users/:id')
//   GetUserById(@Param('id') id: string) {
//     return this.authService.findOne(id);
//   }

//   @HttpCode(HttpStatus.OK)
//   @Put('users/:id/update')
//   UpdateUser(@Param('id') id: string, @Body() dto: UpdateDto) {
//     return this.authService.update(id, dto);
//   }

//   @Delete('users/:id/delete')
//   DeleteUser(@Param('id') id: string) {
//     return this.authService.delete(id);
//   }
