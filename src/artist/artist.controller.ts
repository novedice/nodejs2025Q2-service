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
  async getArtists() {
    return this.artistService.getArtists();
  }
  @Get(':id')
  async getArtist(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }
  @Post()
  @HttpCode(201)
  async createArtist(@Body() newArt: CreateArtistDto) {
    return this.artistService.createArtist(newArt);
  }
  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() updArtist: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updArtist);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
