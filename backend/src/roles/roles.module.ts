import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RepositoryModule } from 'src/repositories/repositories.module';
import { RolesController } from 'src/roles/roles.controller';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [RepositoryModule, AuthModule],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
