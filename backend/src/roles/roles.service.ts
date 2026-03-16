import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PermissionsRepository } from 'src/repositories/permission.repository';
import { RolesRepository } from 'src/repositories/roles.repository';
import { UpdateRolePermissionsDto } from 'src/roles/dto/update-role-permissions.dto';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly permissionsRepository: PermissionsRepository,
  ) {}

  findAll() {
    return this.rolesRepository.findAll();
  }

  async updatePermissions(id: number, dto: UpdateRolePermissionsDto) {
    const role = await this.rolesRepository.findOne(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const uniquePermissionIds = [...new Set(dto.permissionIds)];

    const permissions =
      await this.permissionsRepository.findByIds(uniquePermissionIds);

    if (uniquePermissionIds.length !== permissions.length) {
      throw new BadRequestException('Some permissions not found');
    }

    role.permissions = permissions;
    return this.rolesRepository.save(role);
  }
}
