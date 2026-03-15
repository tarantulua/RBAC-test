import { GetUser } from './decorators/get-user.decorator';
import type { UserSession } from '../types/session';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('select')
  async selectUser(
    @Body('userId') userId: number,
    @Session() session: UserSession,
  ) {
    if (userId == null) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.getUserWithPermissions(userId);
    if (!user) throw new UnauthorizedException();

    session.userId = user.id;

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@GetUser() user: User | null) {
    if (!user) throw new UnauthorizedException('No active session');

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Session() session: UserSession) {
    await new Promise<void>((resolve, reject) => {
      session.destroy((err) => {
        if (err) {
          reject(new Error('Could not log out'));
        } else {
          resolve();
        }
      });
    });

    return { message: 'Logout successful' };
  }
}
