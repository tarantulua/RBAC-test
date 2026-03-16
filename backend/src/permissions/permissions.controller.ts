import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { PermissionsService } from 'src/permissions/permissions.service';
import { RoleName } from 'src/types/role';

@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UseGuards(RoleGuard)
  @Roles(RoleName.ADMIN, RoleName.EDITOR)
  @Get()
  getAllPermissions() {
    return this.permissionsService.findAll();
  }
}
