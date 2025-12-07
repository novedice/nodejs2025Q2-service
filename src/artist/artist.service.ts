import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}
  async getArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtist(artistId: string) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid');
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) throw new NotFoundException('artist does not exist');
    return artist;
  }

  async createArtist(newArtist: CreateArtistDto) {
    if (!newArtist.grammy || !newArtist.name)
      throw new BadRequestException('invalid dto');
    return await this.prisma.artist.create({
      data: newArtist,
    });
  }

  async updateArtist(artistId: string, updArtist: UpdateArtistDto) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid (not uuid)');
    if (
      !updArtist ||
      (updArtist.grammy === undefined && updArtist.name === undefined) ||
      (updArtist.name && typeof updArtist.name !== 'string') ||
      (updArtist.grammy !== undefined && typeof updArtist.grammy !== 'boolean')
    )
      throw new BadRequestException('invalid dto');
    const updatedArtist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!updatedArtist) {
      throw new NotFoundException('artist does not exist');
    }
    return await this.prisma.artist.update({
      data: updArtist,
      where: { id: artistId },
    });
  }

  async deleteArtist(artistId: string) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid (not uuid)');
    const deletedArtist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!deletedArtist) {
      throw new NotFoundException('artist does not exist');
    }
    await this.prisma.artist.delete({
      where: { id: artistId },
    });
  }
}
