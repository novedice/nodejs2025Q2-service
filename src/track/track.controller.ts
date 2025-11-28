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
  async getTracks() {
    return this.trackService.getTracks();
  }
  @Get(':id')
  async getTrack(@Param('id') id: string) {
    return this.trackService.getTrack(id);
  }
  @Post()
  @HttpCode(201)
  async createTrack(@Body() newTrack: CreateTrackDto) {
    return this.trackService.createTrack(newTrack);
  }
  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() updTrack: UpdateTrackDto) {
    return this.trackService.updateTrack(id, updTrack);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
