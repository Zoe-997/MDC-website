import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  Register(@Body() dto: RegisterDto) {
    return this.authService.Register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  Login(@Body() dto: LoginDto) {
    return this.authService.Login(dto);
  }
}
