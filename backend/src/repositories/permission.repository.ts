import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionsRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  findByIds(ids: number[]) {
    return this.permissionRepo.findBy({ id: In(ids) });
  }
}
