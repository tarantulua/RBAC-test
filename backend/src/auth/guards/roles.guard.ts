import { ROLES_KEY } from '../decorators/roles.decorator';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../entities/user.entity';
import { RoleName } from '../../types/role';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) return true;

    const request: Record<string, any> = context.switchToHttp().getRequest();

    const user = request.user as User | undefined;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (!user.role) {
      throw new ForbiddenException('User role not found');
    }

    const hasRole = requiredRoles.includes(user.role.name);

    if (!hasRole) {
      throw new ForbiddenException(`Access denied: Requires another role`);
    }

    return true;
  }
}
