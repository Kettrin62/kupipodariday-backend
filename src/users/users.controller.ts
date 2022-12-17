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
    return this.usersService.findUsername(username);
  }

  @Post('find')
  findUsersByQuery(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findMany(findUsersDto.query)
  }

  @Patch('me')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  getMeWishes(@Req() req) {
    return this.usersService.findWishes(req.user.username);
  }

  @Get(':username/wishes')
  getWishesByUsername(@Param('username') username: string) {
    return this.usersService.findWishes(username);
  }

}
