import { IsString, IsEmail, MinLength, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  status: string;

  @IsInt()
  roleId: number;
}
