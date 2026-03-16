import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { PermissionsRepository } from 'src/repositories/permission.repository';
import { RolesRepository } from 'src/repositories/roles.repository';
import { UsersRepository } from 'src/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, User])],
  providers: [RolesRepository, PermissionsRepository, UsersRepository],
  exports: [RolesRepository, PermissionsRepository, UsersRepository],
})
export class RepositoryModule {}
