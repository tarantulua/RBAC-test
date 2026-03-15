import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { RolesRepository } from 'src/repositories/roles.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import { RoleName } from 'src/types/role';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  findAllUsers(role: RoleName) {
    const GET_USERS_BY_ROLE_MAP: Record<RoleName, () => Promise<User[]>> = {
      [RoleName.VIEWER]: () => this.usersRepository.findAll(),
      [RoleName.EDITOR]: () => this.usersRepository.findAllWithPermissions(),
      [RoleName.ADMIN]: () => this.usersRepository.findAllWithPermissions(),
    };

    return GET_USERS_BY_ROLE_MAP[role]();
  }

  async findAllForUser(currentUser: User) {
    return this.findAllUsers(currentUser.role.name);
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, status, roleId } = createUserDto;

    const role = await this.rolesRepository.findOne(roleId);

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    const user = this.usersRepository.create({
      name,
      email,
      status,
      role,
    });

    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.roleId !== user.role.id) {
      const role = await this.rolesRepository.findOne(updateUserDto.roleId);

      if (!role) {
        throw new BadRequestException('Role not found');
      }

      user.role = role;
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.status = updateUserDto.status;

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
