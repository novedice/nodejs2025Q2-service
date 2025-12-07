import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { validate } from 'uuid';
// import albums from './album.repository';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
// import { favsAlbumsIds } from 'src/favorites/favorites.repository';
// import tracks from 'src/track/track.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlbums() {
    return await this.prisma.album.findMany();
  }
  async getAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    // const album = albums.find((alb) => alb.id === albumId);
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
    // const nAlb = {
    //   ...newAlbum,
    //   id: v4(),
    // };
    // albums.push(nAlb);
    return await this.prisma.album.create({
      data: newAlbum,
    });
  }

  async updateAlbum(albumId: string, updAlb: UpdateAlbumDto) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    // const index = albums.findIndex((album) => album.id === albumId);
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new NotFoundException('album does not exist');
    }
    if (updAlb.artistId && !validate(updAlb.artistId))
      throw new BadRequestException('invalid dto');
    // const updatedAlbum = {
    //   name: updAlb.name ?? albums[index].name,
    //   year: updAlb.year ?? albums[index].year,
    //   artistId: updAlb.artistId ?? albums[index].artistId,
    //   id: albums[index].id,
    // };
    // albums[index] = updatedAlbum;
    return await this.prisma.album.update({
      data: updAlb,
      where: { id: albumId },
    });
  }

  async deleteAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    // const index = albums.findIndex((album) => album.id === albumId);
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new NotFoundException('album does not exist');
    }
    await this.prisma.album.delete({
      where: { id: albumId },
    });
    // const trackId = tracks.findIndex((track) => track.albumId === albumId);
    // if (trackId !== -1)
    //   tracks[trackId] = {
    //     ...tracks[trackId],
    //     albumId: null,
    //   };
    // albums.splice(index, 1);
    // const favsInd = favsAlbumsIds.findIndex((id) => id === albumId);
    // if (favsInd !== -1) favsAlbumsIds.splice(favsInd, 1);
  }
}
