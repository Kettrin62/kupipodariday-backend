import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  providers: [WishesService],
  controllers: [WishesController],
  exports: [WishesService],
})
export class WishesModule {}
