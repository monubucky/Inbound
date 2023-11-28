import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUser: Partial<User>): Promise<User> {
    await this.findOne(id); // Check if the user exists
    await this.userRepository.update(id, updateUser);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id); // Check if the user exists
    await this.userRepository.remove(user);
  }
}
