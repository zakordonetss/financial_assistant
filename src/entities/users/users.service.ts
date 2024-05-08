import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import usersRepository from './users.repository';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    return usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return usersRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User> {
    return usersRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return usersRepository.softDelete(id);
  }
}
