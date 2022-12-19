import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { DataSource, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private wishesService: WishesService,
    // private dataSource: DataSource,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const wish = await this.wishesService.findOne(createOfferDto.itemId);
    console.log(wish);
    
    if (wish.owner.id === user.id) {
      throw new BadRequestException('Собирать деньги на свой подарок запрещено')
    }
    if (wish.price === wish.raised) {
      throw new BadRequestException('Необходимая сумма уже собрана')
    }
    if (createOfferDto.amount > wish.price - wish.raised) {
      throw new BadRequestException(`Предложенная сумма превышает остаток. Осталось собрать ${wish.price - wish.raised} рублей`)
    }

    const offer = await this.offersRepository.create({
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden,
      user,
      item: wish,
    });
    await this.wishesService.updateRaised(wish.id, wish.raised + createOfferDto.amount);

    return this.offersRepository.save(offer);


    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
      


    //   await queryRunner.commitTransaction();
    // } catch {
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   await queryRunner.release();
    // }

  }

  async findOne(id: number): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: {
        id,
      },
      relations: {
        item: {
          owner: true,
        },
        user: {
          wishes: {
            owner: true,
          },
          offers: true,
        },
      },
    });
    if (!offer) {
      throw new NotFoundException();
    }
    return offer;
  }

  async findMany(): Promise<Offer[]> {
    const offers = await this.offersRepository.find({
      relations: {
        item: {
          owner: true,
        },
        user: {
          wishes: {
            owner: true,
          },
          offers: true,
        },
      },
    });
    return offers;
  }
}
