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
import { UsersService } from 'src/users/users.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistsService } from './wishlists.service';

@UseGuards(JwtAuthGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(
    private wishlistsService: WishlistsService,
  ) {}

  @Post()
  async createWishlist(@Body() createWishlistDto: CreateWishlistDto, @Req() req) {
    const wishlist = await this.wishlistsService.create(createWishlistDto, req.user);
    return wishlist;
  }

  @Get()
  getWishlists() {
    return this.wishlistsService.findMany();
  }

  @Get(':id')
  getWishlist(@Param('id') id: number) {
    return this.wishlistsService.findOne(id);
  }
}
