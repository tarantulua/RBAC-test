import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAllWithPermissions() {
    return this.userRepo.find({
      relations: ['role', 'role.permissions'],
    });
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  findOneWithPermissions(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['role', 'role.permissions'],
    });
  }

  create(user: Partial<User>) {
    return this.userRepo.create(user);
  }

  save(user: User) {
    return this.userRepo.save(user);
  }

  remove(user: User) {
    return this.userRepo.remove(user);
  }
}
