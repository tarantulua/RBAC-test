import {
  IsString,
  IsEmail,
  IsNumber,
  MinLength,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Status should not be empty' })
  status: string;

  @IsNumber()
  @IsInt()
  roleId: number;
}
