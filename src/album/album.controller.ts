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
  getAlbums() {
    return this.albumService.getAlbums();
  }
  @Get(':id')
  getAlbum(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }
  @Post()
  createAlbum(@Body() newAlbum: CreateAlbumDto) {
    return this.albumService.createAlbum(newAlbum);
  }
  @Put(':id')
  updateAlbum(@Param('id') id: string, updAlbum: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, updAlbum);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
