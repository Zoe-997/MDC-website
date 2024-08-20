import { Body, Controller, Post, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UpdateDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  Register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  Login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('users/all')
  GetAllUsers() {
    return this.authService.findAll();
  }

  @Get('users/:id')
  GetUserById(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Get('users/:id/update')
  UpdateUser(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.authService.update(id, dto);
  }
}
