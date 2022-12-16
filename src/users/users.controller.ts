import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getMe(@Req() req) {
    // console.log('req.user', req.user);
    
    return req.user;
  }

  
  @Get('me/wishes')
  getMeWishes(@Req() req) {
    console.log('wishes');
    
    return req.user;
  }
  
  // @Patch('me')
  // @Get(':username')

  // @Get(':username/wishes')

  // @Post('find')

  @Post()
  create(): string {
    console.log('cats');
    
    return 'This action adds a new cat';
  }



  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.updateOne(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.removeOne(+id);
  // }
}
