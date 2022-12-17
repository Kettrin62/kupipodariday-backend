import { 
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createWish(@Body() createWishDto: CreateWishDto, @Req() req) {
    return this.wishesService.create(createWishDto, req.user.id);
  }

  @Get('last')
  getWishesLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  getWishesTop() {
    return this.wishesService.findTop();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getWish(@Param('id') id: number) {
    const wish = await this.wishesService.findOne(id)
    if (!wish) {
      throw new NotFoundException();
    }
    return this.wishesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateWish(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req,
  ) {
    await this.wishesService.updateOne(id, updateWishDto, req.user.id);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeWish(
    @Param('id') id: number,
    @Req() req,
  ) {
    const wish = await this.wishesService.findOne(id);
    if (wish.owner.id === req.user.id) {
      await this.wishesService.remove(id);
      return wish;
    } else throw new ForbiddenException();
  }
}
