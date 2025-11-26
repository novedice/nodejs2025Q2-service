import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album/*')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }
  @Get('id')
  getAlbum(@Param() params: any) {
    return this.albumService.getAlbum(params.id);
  }
  @Post()
  postTrack() {
    return this.albumService.postAlbum();
  }
  @Put()
  putTrack() {
    return this.albumService.putAlbum();
  }
  @Delete()
  deleteTrack() {
    return this.albumService.deleteAlbum();
  }
}
