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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return this.albumService.getAlbums();
  }
  @Get(':id')
  async getAlbum(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }
  @Post()
  @HttpCode(201)
  async createAlbum(@Body() newAlbum: CreateAlbumDto) {
    return this.albumService.createAlbum(newAlbum);
  }
  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() updAlbum: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, updAlbum);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
