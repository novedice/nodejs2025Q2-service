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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

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
  @HttpCode(201)
  createTrack(@Body() newTrack: CreateTrackDto) {
    return this.trackService.createTrack(newTrack);
  }
  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() updTrack: UpdateTrackDto) {
    return this.trackService.updateTrack(id, updTrack);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    this.trackService.deleteTrack(id);
  }
}
