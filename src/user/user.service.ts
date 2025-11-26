import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  getUsers(): string {
    return 'users';
  }
  getUser(id: string) {
    return `id in getuser service: ${id}`;
  }
  createUser(createUserDto: CreateUserDto) {
    return `create user: ${createUserDto}`;
  }
  updatePassword(id: string, updPasswordDto: UpdatePasswordDto) {
    return `update password: id - ${id}, payload: ${updPasswordDto}`;
  }
  deleteUser() {}
}
