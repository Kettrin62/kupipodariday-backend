import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor() {}

  auth(user: User) {
    // тут будем генерировать токен
  }
}