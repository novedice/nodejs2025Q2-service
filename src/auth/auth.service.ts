import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export interface decodedToken {
  userId: string;
  login: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async signup(signupDto: SignupDto) {
    if (
      !signupDto.login ||
      !signupDto.password ||
      typeof signupDto.login !== 'string' ||
      typeof signupDto.password !== 'string'
    )
      throw new BadRequestException('dto is invalid');
    const hash = await bcrypt.hash(
      signupDto.password,
      Number(process.env.CRYPT_SALT),
    );
    const date = new Date();
    const newUser = await this.prisma.user.create({
      data: {
        login: signupDto.login,
        password: hash,
        createdAt: date,
        updatedAt: date,
      },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });
    return newUser;
  }

  async login(loginDto: LoginDto) {
    if (
      !loginDto.login ||
      !loginDto.password ||
      typeof loginDto.login !== 'string' ||
      typeof loginDto.password !== 'string'
    )
      throw new BadRequestException('dto is invalid');
    const user = await this.prisma.user.findFirst({
      where: { login: loginDto.login },
    });
    if (!user) throw new ForbiddenException('user not found');
    const compare = await bcrypt.compare(loginDto.password, user.password);
    if (compare) {
      return this.generateToken(user);
    }
    throw new ForbiddenException('password does not match');
  }

  async refresh(refreshToken: string) {
    console.log('refreshToken: ', refreshToken);
    if (!refreshToken) throw new UnauthorizedException('dto is invalid');
    try {
      const decodedToken = jwt.decode(refreshToken) as unknown as decodedToken;
      console.log('decoded:', decodedToken);
      if (new Date(decodedToken.exp * 1000) < new Date()) {
        throw new ForbiddenException('token is expired');
      }
      const payload = {
        userId: decodedToken.userId,
        login: decodedToken.login,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      const refreshedToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_REFRESH_KEY,
        { expiresIn: '24h' },
      );
      return { accessToken: accessToken, refreshToken: refreshedToken };
    } catch {
      throw new ForbiddenException('refresh token is invalid');
    }
  }

  generateToken(user) {
    try {
      const accessToken = jwt.sign(
        { userId: user.id, login: user.login },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        },
      );
      const refreshToken = jwt.sign(
        { userId: user.id, login: user.login },
        process.env.JWT_SECRET_REFRESH_KEY,
        { expiresIn: '24h' },
      );
      return { accessToken: accessToken, refreshToken: refreshToken };
    } catch {}
  }
}
