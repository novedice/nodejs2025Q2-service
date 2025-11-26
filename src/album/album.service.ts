import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { v4, validate } from 'uuid';
import albums from './album.repository';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  getAlbums() {
    return albums;
  }
  getAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const album = albums.find((alb) => alb.id === albumId);
    if (!album) {
      throw new NotFoundException('album not found');
    }
    return album;
  }
  createAlbum(newAlbum: CreateAlbumDto) {
    if (!newAlbum.name || !newAlbum.year || !newAlbum.artistId)
      throw new BadRequestException('not all fields');
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
      throw new NotFoundException('album not found');
    }
    const updatedAlbum = {
      name: updAlb.name ? updAlb.name : albums[index].name,
      year: updAlb.year ? updAlb.year : albums[index].year,
      artistId: updAlb.artistId ? updAlb.artistId : albums[index].artistId,
      id: albums[index].id,
    };
    albums[index] = updatedAlbum;
    return updatedAlbum;
  }
  deleteAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const index = albums.findIndex((album) => album.id === albumId);
    if (index === -1) {
      throw new NotFoundException('album not found');
    }
    albums.splice(index, 1);
  }
}
