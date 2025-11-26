import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
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
  createUser(@Req() request: Request) {
    console.log('req:', request.body);
    const createUserDto = request.body as unknown as CreateUserDto;
    console.log(createUserDto.login);
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(@Param() params: any, updPasswordDto: UpdatePasswordDto) {
    return this.userService.updatePassword(params.id, updPasswordDto);
  }

  @Delete(':id')
  deleteUser(@Param() params: any) {
    return this.userService.deleteUser(params.id);
  }
}
