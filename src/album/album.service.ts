import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  getAlbums(): string {
    return 'albums';
  }
  getAlbum(albumId: string) {
    return `album with id ${albumId}`;
  }
  postAlbum() {}
  putAlbum() {}
  deleteAlbum() {}
}
