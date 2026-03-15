import { IsString, IsEmail, IsNumber, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  status: string;

  @IsNumber()
  roleId: number;
}
