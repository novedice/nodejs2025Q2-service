import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { v4, validate } from 'uuid';
import artists from './artist.repository';

@Injectable()
export class ArtistService {
  getArtists(): string {
    return 'artists';
  }
  getArtist(artistId: string) {
    return `artist with id ${artistId}`;
  }
  createArtist(newArtist: CreateArtistDto) {
    if (!newArtist.grammy || !newArtist.name)
      throw new BadRequestException('not all fields');
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
    const index = artists.findIndex((art) => art.id === artistId);
    if (index === -1) {
      throw new NotFoundException('artist not found');
    }
    const updatedArt = {
      name: updArtist.name ? updArtist.name : artists[index].name,
      grammy: updArtist.grammy ? updArtist.grammy : artists[index].grammy,
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
      throw new NotFoundException('artist not found');
    }
    artists.splice(index, 1);
  }
}
