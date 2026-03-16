import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { RoleName } from 'src/types/role';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const dataSource = app.get(DataSource);

    const permissionRepo = dataSource.getRepository(Permission);
    const roleRepo = dataSource.getRepository(Role);
    const userRepo = dataSource.getRepository(User);

    console.log('🌱 Seeding database...');

    // 1. Create Permissions
    const permissionsData = [
      { slug: 'users:view', description: 'Can view users' },
      { slug: 'users:edit', description: 'Can edit users' },
      { slug: 'users:delete', description: 'Can delete users' },
    ];
    const permissions = await permissionRepo.save(permissionsData);

    // 2. Create Roles
    const adminRole = await roleRepo.save({
      name: RoleName.ADMIN,
      permissions: permissions,
    });

    const editorRole = await roleRepo.save({
      name: RoleName.EDITOR,
      permissions: permissions.filter((p) => p.slug !== 'users:delete'),
    });

    const viewerRole = await roleRepo.save({
      name: RoleName.VIEWER,
      permissions: permissions.filter((p) => p.slug === 'users:view'),
    });

    // 3. Create Users
    await userRepo.save([
      { name: 'Alice Admin', email: 'admin@example.com', role: adminRole },
      { name: 'Bob Editor', email: 'editor@example.com', role: editorRole },
      { name: 'Charlie Viewer', email: 'viewer@example.com', role: viewerRole },
    ]);

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

void bootstrap();
