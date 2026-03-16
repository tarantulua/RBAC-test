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

  findAllWithRoles() {
    return this.userRepo.find({ relations: ['role'] });
  }

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

  async save(user: User) {
    const savedUser = await this.userRepo.save(user);

    const userWithRole = await this.userRepo.findOne({
      where: { id: savedUser.id },
      relations: ['role'],
    });

    return userWithRole ?? savedUser;
  }

  remove(user: User) {
    return this.userRepo.remove(user);
  }
}
