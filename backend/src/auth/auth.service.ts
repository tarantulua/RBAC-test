import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUserWithPermissions(id: number) {
    return this.usersRepository.findOneWithPermissions(id);
  }
}
