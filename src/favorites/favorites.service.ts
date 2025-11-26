import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  getFavorites(): string {
    return 'favorites';
  }
  postFavTrack() {}
  deleteFavTrack() {}
  postFavAlbum() {}
  deleteFavAlbum() {}
  postFavArtist() {}
  deleteFavArtist() {}
}
