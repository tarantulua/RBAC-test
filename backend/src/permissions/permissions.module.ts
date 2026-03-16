import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsController } from 'src/permissions/permissions.controller';
import { PermissionsService } from 'src/permissions/permissions.service';
import { RepositoryModule } from 'src/repositories/repositories.module';

@Module({
  imports: [RepositoryModule, AuthModule],
  providers: [PermissionsService],
  controllers: [PermissionsController],
  exports: [PermissionsService],
})
export class PermissionsModule {}
