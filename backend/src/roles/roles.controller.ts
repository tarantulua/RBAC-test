import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { UpdateRolePermissionsDto } from 'src/roles/dto/update-role-permissions.dto';
import { RolesService } from 'src/roles/roles.service';
import { RoleName } from 'src/types/role';

@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(RoleGuard)
  @Roles(RoleName.ADMIN, RoleName.EDITOR)
  @Get()
  getAllRoles() {
    return this.rolesService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles(RoleName.ADMIN)
  @Put(':id')
  updateRolePermissions(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRolePermissionsDto: UpdateRolePermissionsDto,
  ) {
    return this.rolesService.updatePermissions(id, updateRolePermissionsDto);
  }
}
