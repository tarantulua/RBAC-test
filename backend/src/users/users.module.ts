import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RepositoryModule } from 'src/repositories/repositories.module';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [RepositoryModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
