import { 
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { UsersService } from 'src/users/users.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistsService } from './wishlists.service';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(
    private wishlistsService: WishlistsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createWishlist(@Body() createWishlistDto: CreateWishlistDto, @Req() req) {
    const owner = await this.usersService.findOne(req.user.id);
    
    return {}
  }
}
