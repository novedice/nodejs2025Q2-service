import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import users from './user.repository';
import { User } from './interfaces/user.interface';
import { v4, validate } from 'uuid';

@Injectable()
export class UserService {
  getUsers() {
    return users.map((user) => ({
      login: user.login,
      createdAt: user.createdAt,
      id: user.id,
      updatedAt: user.updatedAt,
      version: user.version,
    }));
  }
  getUser(id: string) {
    if (!validate(id))
      throw new BadRequestException('userId is invalid (not uuid)');
    const user = users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('user does not exist');
    return {
      login: user.login,
      createdAt: user.createdAt,
      id: user.id,
      updatedAt: user.updatedAt,
      version: user.version,
    };
  }
  createUser(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password)
      throw new BadRequestException(
        'the request does not contain required fields: login and password',
      );
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
    return {
      login: newUser.login,
      createdAt: newUser.createdAt,
      id: newUser.id,
      updatedAt: newUser.updatedAt,
      version: newUser.version,
    };
  }
  updatePassword(id: string, updPasswordDto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException('userId is invalid (not uuid)');
    }
    if (!updPasswordDto.oldPassword || !updPasswordDto.oldPassword)
      throw new BadRequestException('invalid dto');
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('user does not exists');
    if (users[index].password !== updPasswordDto.oldPassword)
      throw new ForbiddenException('old password is wrong');
    const updatedUser = {
      ...users[index],
      password: updPasswordDto.newPassword,
      version: users[index].version + 1,
      updatedAt: Date.now(),
    };
    users[index] = updatedUser;
    return {
      login: updatedUser.login,
      createdAt: updatedUser.createdAt,
      id: updatedUser.id,
      updatedAt: updatedUser.updatedAt,
      version: updatedUser.version,
    };
  }
  deleteUser(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('userId is invalid (not uuid)');
    }
    const index = users.findIndex((u) => u.id === id) ?? null;
    if (index === -1) throw new NotFoundException('user does not exists');
    users.splice(index, 1);
  }
}
