import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('artist/*')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }
  @Get(':id')
  getArtist(@Param() params: any) {
    return this.artistService.getArtist(params.id);
  }
  @Post()
  postTrack() {
    return this.artistService.postArtist();
  }
  @Put()
  putTrack() {
    return this.artistService.putArtist();
  }
  @Delete()
  deleteTrack() {
    return this.artistService.deleteArtist();
  }
}
