import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import tracks from 'src/track/track.repository';
import { validate } from 'uuid';
import {
  favsAlbumsIds,
  favsArtistsIds,
  favsTracksIds,
} from './favorites.repository';
import artists from 'src/artist/artist.repository';
import albums from 'src/album/album.repository';
import { FavoritesResponse } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  getFavorites() {
    const fav: FavoritesResponse = {
      artists: favsArtistsIds.map((artistId) =>
        artists.find((artist) => artist.id === artistId),
      ),
      albums: favsAlbumsIds.map((albumId) =>
        albums.find((album) => album.id === albumId),
      ),
      tracks: favsTracksIds.map((trackId) =>
        tracks.find((track) => track.id === trackId),
      ),
    };
    return fav;
  }
  addFavTrack(trackId: string) {
    if (!validate(trackId)) throw new BadRequestException('trackId is invalid');
    const index = tracks.findIndex((tr) => tr.id === trackId);
    if (index === -1)
      throw new UnprocessableEntityException('track does not exists');
    if (favsTracksIds.findIndex((id) => id === trackId) === -1)
      favsTracksIds.push(trackId);
    return 'Track added to favorites';
  }
  deleteFavTrack(trackId: string) {
    if (!validate(trackId)) throw new BadRequestException('trackId is invalid');
    const index = favsTracksIds.findIndex((id) => id === trackId);
    if (index === -1) throw new NotFoundException('track is not favorite');
    favsTracksIds.splice(index, 1);
  }
  addFavAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const index = albums.findIndex((album) => album.id === albumId);
    if (index === -1)
      throw new UnprocessableEntityException('album does not exists');
    if (favsAlbumsIds.findIndex((id) => id === albumId) === -1)
      favsAlbumsIds.push(albumId);
    return 'album added to favorites';
  }
  deleteFavAlbum(albumId: string) {
    if (!validate(albumId)) throw new BadRequestException('albumId is invalid');
    const index = favsAlbumsIds.findIndex((id) => id === albumId);
    if (index === -1) throw new NotFoundException('album is not favorite');
    favsAlbumsIds.splice(index, 1);
  }
  addFavArtist(artistId: string) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid');
    const index = artists.findIndex((artist) => artist.id === artistId);
    if (index === -1)
      throw new UnprocessableEntityException('artist does not exists');
    if (favsArtistsIds.findIndex((id) => id === artistId) === -1)
      favsArtistsIds.push(artistId);
    return 'artist added to favorites';
  }
  deleteFavArtist(artistId: string) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid');
    const index = favsArtistsIds.findIndex((id) => id === artistId);
    if (index === -1) throw new NotFoundException('artist is not favorite');
    favsArtistsIds.splice(index, 1);
  }
}
