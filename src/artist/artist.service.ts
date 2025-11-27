import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { v4, validate } from 'uuid';
import artists from './artist.repository';
import albums from 'src/album/album.repository';
import { favsArtistsIds } from 'src/favorites/favorites.repository';
import tracks from 'src/track/track.repository';

@Injectable()
export class ArtistService {
  getArtists() {
    return artists;
  }
  getArtist(artistId: string) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid');
    const index = artists.findIndex((art) => art.id === artistId);
    if (index === -1) throw new NotFoundException('artist does not exists');
    return artists[index];
  }
  createArtist(newArtist: CreateArtistDto) {
    if (!newArtist.grammy || !newArtist.name)
      throw new BadRequestException('invalid dto');
    const nArt = {
      ...newArtist,
      id: v4(),
    };
    artists.push(nArt);
    return nArt;
  }
  updateArtist(artistId: string, updArtist: UpdateArtistDto) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid');
    if (
      !updArtist ||
      (updArtist.grammy === undefined && updArtist.name === undefined) ||
      (updArtist.name && typeof updArtist.name !== 'string') ||
      (updArtist.grammy !== undefined && typeof updArtist.grammy !== 'boolean')
    )
      throw new BadRequestException('invalid dto');
    const index = artists.findIndex((art) => art.id === artistId);
    if (index === -1) {
      throw new NotFoundException('artist does not exist');
    }
    const updatedArt = {
      name: updArtist.name ?? artists[index].name,
      grammy: updArtist.grammy ?? artists[index].grammy,
      id: artists[index].id,
    };
    artists[index] = updatedArt;
    return updatedArt;
  }
  deleteArtist(artistId: string) {
    if (!validate(artistId))
      throw new BadRequestException('artistId is invalid');
    const index = artists.findIndex((art) => art.id === artistId);
    if (index === -1) {
      throw new NotFoundException('artist does not exist');
    }
    const albumId = albums.findIndex((album) => album.artistId === artistId);
    if (albumId !== -1)
      albums[albumId] = {
        ...albums[albumId],
        artistId: null,
      };
    const trackId = tracks.findIndex((track) => track.artistId === artistId);
    if (trackId !== -1)
      tracks[trackId] = {
        ...tracks[trackId],
        artistId: null,
      };
    artists.splice(index, 1);
    const favsInd = favsArtistsIds.findIndex((id) => id === artistId);
    if (favsInd !== -1) favsArtistsIds.splice(favsInd, 1);
  }
}
