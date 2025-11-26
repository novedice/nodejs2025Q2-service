import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param() params: any) {
    return this.userService.getUser(params.id);
  }

  @Post()
  createUser(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(@Param() params: any, updPasswordDto: UpdatePasswordDto) {
    return this.userService.updatePassword(params.id, updPasswordDto);
  }

  @Delete()
  deleteUser() {
    return this.userService.deleteUser();
  }
}
