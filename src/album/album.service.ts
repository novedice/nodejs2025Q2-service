import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { v4, validate } from 'uuid';
import albums from './album.repository';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { favsAlbumsIds } from 'src/favorites/favorites.repository';
import tracks from 'src/track/track.repository';

@Injectable()
export class AlbumService {
  getAlbums() {
    return albums;
  }
  getAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const album = albums.find((alb) => alb.id === albumId);
    if (!album) {
      throw new NotFoundException('album does not exist');
    }
    return album;
  }
  createAlbum(newAlbum: CreateAlbumDto) {
    if (!newAlbum.name || !newAlbum.year)
      throw new BadRequestException('invalid dto');
    const nAlb = {
      ...newAlbum,
      id: v4(),
    };
    albums.push(nAlb);
    return nAlb;
  }
  updateAlbum(albumId: string, updAlb: UpdateAlbumDto) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const index = albums.findIndex((album) => album.id === albumId);
    if (index === -1) {
      throw new NotFoundException('album does not exist');
    }
    if (updAlb.artistId && !validate(updAlb.artistId))
      throw new BadRequestException('invalid dto');
    const updatedAlbum = {
      name: updAlb.name ?? albums[index].name,
      year: updAlb.year ?? albums[index].year,
      artistId: updAlb.artistId ?? albums[index].artistId,
      id: albums[index].id,
    };
    albums[index] = updatedAlbum;
    return updatedAlbum;
  }
  deleteAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const index = albums.findIndex((album) => album.id === albumId);
    if (index === -1) {
      throw new NotFoundException('album does not exist');
    }
    const trackId = tracks.findIndex((track) => track.albumId === albumId);
    if (trackId !== -1)
      tracks[trackId] = {
        ...tracks[trackId],
        albumId: null,
      };
    albums.splice(index, 1);
    const favsInd = favsAlbumsIds.findIndex((id) => id === albumId);
    if (favsInd !== -1) favsAlbumsIds.splice(favsInd, 1);
  }
}
