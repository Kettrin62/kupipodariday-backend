import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersService } from './offers.service';

@UseGuards(JwtAuthGuard)
@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Post()
  async createOffer(@Body() createOfferDto: CreateOfferDto, @Req() req) {
    await this.offersService.create(createOfferDto, req.user);
    return {};
  }

  @Get(':id')
  getOffer(@Param('id') id: number) {
    return this.offersService.findOne(id);
  }

  @Get()
  getOffers() {
    return this.offersService.findMany();
  }
}
