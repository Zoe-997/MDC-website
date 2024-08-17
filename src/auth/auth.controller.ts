import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  Login() {
    return this.authService.Login();
  }

  @Post('register')
  Register(@Body() dto: AuthDto) {
    return this.authService.Register(dto);
  }
}
