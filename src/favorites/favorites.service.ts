import {
  Injectable,
  BadRequestException,
  // NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}
  async getFavorites() {
    const favorites = await this.prisma.favorites.findFirst({
      include: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });
    if (!favorites)
      return await this.prisma.favorites.create({
        data: {
          id: v4(),
        },
        include: {
          artists: true,
          albums: true,
          tracks: true,
        },
      });
    return favorites;
  }

  async addFavTrack(trackId: string) {
    if (!validate(trackId))
      throw new BadRequestException('trackId is invalid (not uuid)');
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) throw new UnprocessableEntityException('track does not exist');
    const favs = await this.getFavorites();
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: {
        tracks: {
          connect: { id: trackId },
        },
      },
    });
    return 'Track added to favorites';
  }

  async deleteFavTrack(trackId: string) {
    if (!validate(trackId))
      throw new BadRequestException('trackId is invalid (not uuid)');
    const favs = await this.getFavorites();
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: {
        tracks: {
          disconnect: { id: trackId },
        },
      },
    });
    // if (index === -1) throw new NotFoundException('track is not in favorites');
  }

  async addFavAlbum(albumId: string) {
    if (!validate(albumId))
      throw new BadRequestException('albumId is invalid (not uuid)');
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) throw new UnprocessableEntityException('album does not exist');
    const favs = await this.getFavorites();
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: {
        albums: { connect: { id: albumId } },
      },
    });
    return 'album added to favorites';
  }

  async deleteFavAlbum(albumId: string) {
    if (!validate(albumId))
      throw new BadRequestException('albumId is invalid (not uuid)');
    const favs = await this.getFavorites();
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: { albums: { disconnect: { id: albumId } } },
    });
    // if (index === -1) throw new NotFoundException('album is not in favorites');
  }

  async addFavArtist(artistId: string) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid (not uuid)');
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist)
      throw new UnprocessableEntityException('artist does not exist');
    const favs = await this.getFavorites();
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: {
        artists: { connect: { id: artistId } },
      },
    });
    return 'artist added to favorites';
  }

  async deleteFavArtist(artistId: string) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid (not uuid)');
    const favs = await this.getFavorites();
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: {
        artists: { disconnect: { id: artistId } },
      },
    });
    // if (index === -1) throw new NotFoundException('artist is not in favorites');
  }
}
