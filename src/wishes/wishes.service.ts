import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, owner: User): Promise<Wish> {
    const wish = await this.wishesRepository.create({
      ...createWishDto,
      owner,
    });
    return this.wishesRepository.save(wish);
  }

  async findLast(): Promise<Wish[]> {
    const wishes = await this.wishesRepository.find({
      take: 40,
      order: {
        createdAt: 'DESC',
      },
      relations: {
        owner: true,
      },
    });
    return wishes;
  }

  async findTop(): Promise<Wish[]> {
    const wishes = await this.wishesRepository.find({
      take: 20,
      order: {
        copied: 'DESC',
      },
      relations: {
        owner: true,
      },
    });
    return wishes;
  }

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishesRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
      },
    });
    if (!wish) {
      throw new NotFoundException();
    }
    return wish;
  }

  async updateOne(
    wishId: number,
    updateWishDto: UpdateWishDto,
    userId: number,
  ): Promise<UpdateResult> {
    const wish = await this.findOne(wishId);
    if (wish.owner.id !== userId) {
      throw new ForbiddenException();
    }
    if (wish.offers.length === 0) {
      return this.wishesRepository.update(wishId, updateWishDto);
    } else {
      const { price, ...data } = updateWishDto;
      return this.wishesRepository.update(wishId, data);
    }
  }

  remove(id: number) {
    return this.wishesRepository.delete(id);
  }

  updateCopied(id: number, copied: number) {
    return this.wishesRepository.update(id, { copied });
  }

  updateRaised(id: number, raised: number) {
    return this.wishesRepository.update(id, { raised });
  }

  findMany(options: FindManyOptions<Wish>): Promise<Wish[]> {
    return this.wishesRepository.find(options);
  }
}
