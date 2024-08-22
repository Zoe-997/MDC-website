import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Match } from 'src/commons/validators/match.decorator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  @Match('password', { message: 'Password and Reset Password must match' })
  resetPassword: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}
