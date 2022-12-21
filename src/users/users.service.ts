import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createHash(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await this.createHash(createUserDto.password);

    const createUserHash: CreateUserDto = {
      ...createUserDto,
      password: hash,
    };

    const user = await this.usersRepository.create(createUserHash);

    return this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ id })
      .addSelect('user.email')
      .getOne();

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ username })
      .addSelect('user.password')
      .addSelect('user.email')
      .getOne();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });
    return user;
  }

  async findMany(query: string): Promise<User[]> {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: query })
      .orWhere('user.email = :email', { email: query })
      .addSelect('user.email')
      .getMany();

    return users;
  }

  async updateOne(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    if (updateUserDto.password) {
      const hash = await this.createHash(updateUserDto.password);
      updateUserDto.password = hash;
    }
    return this.usersRepository.update({ id }, updateUserDto);
  }

  async findWishesUser(username: string): Promise<Wish[]> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
      relations: {
        wishes: {
          owner: true,
        },
      },
    });
    return user.wishes;
  }

  async findWishes(username: string): Promise<Wish[]> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
      relations: {
        wishes: true,
      },
    });
    return user.wishes;
  }

  async findMails(usersId: number[]): Promise<string[]> {
    const users = await this.usersRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id IN (:...usersId)', { usersId })
      .addSelect('user.email')
      .getMany();

    return users.map((user) => user.email);
  }
}
