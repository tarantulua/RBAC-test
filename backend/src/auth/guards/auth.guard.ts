import { UserSession } from './../../types/session';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Record<string, any> = context.switchToHttp().getRequest();

    const session = request.session as UserSession;

    if (!session || !session.userId) {
      throw new UnauthorizedException('Please log in to access this resource');
    }

    const user = await this.authService.getUserWithPermissions(session.userId);

    if (!user) {
      throw new UnauthorizedException('User session invalid');
    }

    request.user = user;

    return true;
  }
}
