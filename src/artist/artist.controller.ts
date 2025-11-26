import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }
  @Get(':id')
  getArtist(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }
  @Post()
  createArtist(@Body() newArt: CreateArtistDto) {
    return this.artistService.createArtist(newArt);
  }
  @Put(':id')
  updateArtist(@Param('id') id: string, updArtist: UpdateArtistDto) {
    return this.artistService.updateArtist(id, updArtist);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
