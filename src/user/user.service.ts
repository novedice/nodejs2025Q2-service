import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUser(id: string) {
    if (!validate(id))
      throw new BadRequestException('userId is invalid (not uuid)');
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException('user does not exist');
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password)
      throw new BadRequestException(
        'the request does not contain required fields: login and password',
      );
    const date = new Date();
    const newUser = await this.prisma.user.create({
      data: {
        version: 1,
        login: createUserDto.login,
        password: createUserDto.password,
        createdAt: date,
        updatedAt: date,
      },
    });
    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt.getTime(),
      updatedAt: newUser.updatedAt.getTime(),
    };
  }

  async updatePassword(id: string, updPasswordDto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException('userId is invalid (not uuid)');
    }
    if (!updPasswordDto.oldPassword || !updPasswordDto.oldPassword)
      throw new BadRequestException('invalid dto');
    const findUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!findUser) throw new NotFoundException('user does not exists');
    if (findUser.password !== updPasswordDto.oldPassword)
      throw new ForbiddenException('old password is wrong');
    const updatedUser = await this.prisma.user.update({
      data: {
        password: updPasswordDto.newPassword,
        version: findUser.version + 1,
        updatedAt: new Date(),
      },
      where: { id: id },
    });
    return {
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
  }

  async deleteUser(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('userId is invalid (not uuid)');
    }
    const delUser = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!delUser) throw new NotFoundException('user does not exists');
    await this.prisma.user.delete({ where: { id: id } });
  }
}
