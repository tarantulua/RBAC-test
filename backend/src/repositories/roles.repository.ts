import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  findAll() {
    return this.roleRepo.find({ relations: ['permissions'] });
  }

  findOne(id: number) {
    return this.roleRepo.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  save(role: Role) {
    return this.roleRepo.save(role);
  }
}
