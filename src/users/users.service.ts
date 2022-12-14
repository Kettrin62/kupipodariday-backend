import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('create');
    
    // return this.userRepository.save(createUserDto);
    const hash = await bcrypt.hash(createUserDto.password, 10);

    const createUserWithHashPassword: CreateUserDto = {
      ...createUserDto,
      password: hash,
    };

    const user = await this.usersRepository.create(createUserWithHashPassword);

    return this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update({ id }, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async removeOne(id: number) {
    return this.usersRepository.delete({ id });
  }

  async findByUsername(username: string) {
    // const user = await this.userRepository.findOneBy({ username });
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.wishes', 'wish')
      .where({ username })
      .addSelect('user.password')
      .addSelect('user.email')
      .getOne();
    return user;
  }
}
