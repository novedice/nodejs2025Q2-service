import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import users from './user.repository';
import { User } from 'src/interfaces/interfaces';
import { v4, validate } from 'uuid';

@Injectable()
export class UserService {
  getUsers(): User[] {
    return users;
  }
  getUser(id: string) {
    if (!validate(id)) {
      return 'user id is invalid';
    }
    const user = users.find((u) => u.id === id) ?? null;
    if (!user) return 'user does not exists';
    return user;
  }
  createUser(createUserDto: CreateUserDto) {
    const date = Date.now();
    const newUser: User = {
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: date,
      updatedAt: date,
      id: v4(),
      version: 1,
    };
    users.push(newUser);
    return 'OK';
  }
  updatePassword(id: string, updPasswordDto: UpdatePasswordDto) {
    if (!validate(id)) {
      return 'user id is invalid';
    }
    const index = users.findIndex((user) => user.id === id) ?? null;
    if (!index) return 'user does not exists';
    if (users[index].password !== updPasswordDto.oldPassword)
      return 'old password is wrong';
    const updatedUser = {
      ...users[index],
      password: updPasswordDto.newPassword,
    };
    users.splice(index, 1);
    users.push(updatedUser);
    return `update password: id - ${id}, payload: ${updPasswordDto}`;
  }
  deleteUser(id: string) {
    if (!validate(id)) {
      return 'user id is invalid';
    }
    const index = users.findIndex((u) => u.id === id) ?? null;
    if (!index) return 'user does not exists';
    users.splice(index, 1);
  }
}
