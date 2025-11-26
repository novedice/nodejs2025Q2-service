import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto, UpdateTrack } from './interfaces.track';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }
  @Get(':id')
  getTrack(@Param('id') id: string) {
    return this.trackService.getTrack(id);
  }
  @Post()
  createTrack(@Body() newTrack: TrackDto) {
    return this.trackService.createTrack(newTrack);
  }
  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() updTrack: UpdateTrack) {
    return this.trackService.updateTrack(id, updTrack);
  }
  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
