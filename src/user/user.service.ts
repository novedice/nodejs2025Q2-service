import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
// import users from './user.repository';
// import { User } from './interfaces/user.interface';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    console.log(Object.keys(this.prisma));
    return this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    // return users.map((user) => ({
    //   login: user.login,
    //   createdAt: user.createdAt,
    //   id: user.id,
    //   updatedAt: user.updatedAt,
    //   version: user.version,
    // }));
  }
  async getUser(id: string) {
    if (!validate(id))
      throw new BadRequestException('userId is invalid (not uuid)');
    // const user = users.find((u) => u.id === id);
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) throw new NotFoundException('user does not exist');
    return {
      login: user.login,
      createdAt: user.createdAt,
      id: user.id,
      updatedAt: user.updatedAt,
      version: user.version,
    };
  }
  async createUser(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password)
      throw new BadRequestException(
        'the request does not contain required fields: login and password',
      );
    // const date = Date.now();
    // const newUser: User = {
    //   login: createUserDto.login,
    //   password: createUserDto.password,
    //   createdAt: date,
    //   updatedAt: date,
    //   id: v4(),
    //   version: 1,
    // };
    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });
    // users.push(newUser);
    return {
      login: newUser.login,
      createdAt: newUser.createdAt,
      id: newUser.id,
      updatedAt: newUser.updatedAt,
      version: newUser.version,
    };
  }
  async updatePassword(id: string, updPasswordDto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException('userId is invalid (not uuid)');
    }
    if (!updPasswordDto.oldPassword || !updPasswordDto.oldPassword)
      throw new BadRequestException('invalid dto');
    const findUser = await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
    });
    // const index = users.findIndex((user) => user.id === id);

    if (!findUser) throw new NotFoundException('user does not exists');
    if (findUser.password !== updPasswordDto.oldPassword)
      throw new ForbiddenException('old password is wrong');
    // const updatedUser = {
    //   ...users[index],
    //   password: updPasswordDto.newPassword,
    //   version: users[index].version + 1,
    //   updatedAt: Date.now(),
    // };
    // users[index] = updatedUser;
    const updatedUser = await this.prisma.user.update({
      data: updPasswordDto,
      where: { id: id },
    });
    return {
      login: updatedUser.login,
      createdAt: updatedUser.createdAt,
      id: updatedUser.id,
      updatedAt: updatedUser.updatedAt,
      version: updatedUser.version,
    };
  }
  async deleteUser(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('userId is invalid (not uuid)');
    }
    // const index = users.findIndex((u) => u.id === id) ?? null;
    const delUser = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!delUser) throw new NotFoundException('user does not exists');
    // users.splice(index, 1);
    await this.prisma.user.delete({ where: { id: id } });
  }
}
