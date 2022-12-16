import { 
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { CreateWishDto } from './dto/create-wish.dto';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createWish(@Body() createWishDto: CreateWishDto, @Req() req) {
    await this.wishesService.create(createWishDto, req.user.id);

    return {}
  }
}
