import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/entities/user.entity';
import { RoleName } from 'src/types/role';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@GetUser() currentUser: User) {
    return this.usersService.findAllForUser(currentUser);
  }

  @UseGuards(RoleGuard)
  @Roles(RoleName.ADMIN)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(RoleGuard)
  @Roles(RoleName.ADMIN, RoleName.EDITOR)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(RoleGuard)
  @Roles(RoleName.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
