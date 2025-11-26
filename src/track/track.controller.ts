import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('track/*')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }
  @Get(':id')
  getTrack(@Param() params: any) {
    return this.trackService.getTrack(params.id);
  }
  @Post()
  postTrack() {
    return this.trackService.postTrack();
  }
  @Put()
  putTrack() {
    return this.trackService.putTrack();
  }
  @Delete()
  deleteTrack() {
    return this.trackService.deleteTrack();
  }
}
