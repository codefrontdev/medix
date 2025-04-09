import { Injectable } from '@nestjs/common';
import { UsersRepository } from './persistence/repositories/users.repository';
import { User } from './domain/entities/user';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findById(userId: string): Promise<User> {
    return this.userRepository.getById(userId);
  }
}
