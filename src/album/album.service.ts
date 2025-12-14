import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { validate } from 'uuid';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlbums() {
    return await this.prisma.album.findMany();
  }
  async getAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new NotFoundException('album does not exist');
    }
    return album;
  }
  async createAlbum(newAlbum: CreateAlbumDto) {
    if (!newAlbum.name || !newAlbum.year)
      throw new BadRequestException('invalid dto');
    return await this.prisma.album.create({
      data: newAlbum,
    });
  }

  async updateAlbum(albumId: string, updAlb: UpdateAlbumDto) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new NotFoundException('album does not exist');
    }
    if (updAlb.artistId && !validate(updAlb.artistId))
      throw new BadRequestException('invalid dto');
    return await this.prisma.album.update({
      data: updAlb,
      where: { id: albumId },
    });
  }

  async deleteAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new NotFoundException('album does not exist');
    }
    await this.prisma.album.delete({
      where: { id: albumId },
    });
  }
}
