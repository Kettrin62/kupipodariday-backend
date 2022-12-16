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
import { FindUsersDto } from './dto/find-users-dto';
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

  @Get(':username')
  getUserByUsername(@Param('username') username: string) {
    // console.log('username', this.usersService.findByUsername(username));
    return this.usersService.findByUsername(username);
  }

  @Post('find')
  findUsersByQuery(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findMany(findUsersDto.query)
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
