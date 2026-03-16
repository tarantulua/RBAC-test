import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from 'src/repositories/permission.repository';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  findAll() {
    return this.permissionsRepository.findAll();
  }
}
