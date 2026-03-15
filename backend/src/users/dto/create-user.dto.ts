import { IsString, IsEmail, IsNumber, MinLength, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  status: string;

  @IsNumber()
  @IsInt()
  roleId: number;
}
