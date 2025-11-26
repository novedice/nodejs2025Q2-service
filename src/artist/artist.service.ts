import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  getArtists(): string {
    return 'artists';
  }
  getArtist(artistId: string) {
    return `artist with id ${artistId}`;
  }
  postArtist() {}
  putArtist() {}
  deleteArtist() {}
}
