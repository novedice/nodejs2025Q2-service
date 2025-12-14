import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async getTracks() {
    return this.prisma.track.findMany();
  }

  async getTrack(trackId: string) {
    if (!validate(trackId))
      throw new BadRequestException('trackId is invalid (not uuid)');
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) throw new NotFoundException('track does not exist');
    return track;
  }

  async createTrack(newTrack: CreateTrackDto) {
    if (!newTrack.duration || !newTrack.name)
      throw new BadRequestException('invalid dto');
    return await this.prisma.track.create({ data: newTrack });
  }

  async updateTrack(trackId: string, updTrack: UpdateTrackDto) {
    if (!validate(trackId))
      throw new BadRequestException('trackId is invalid (not uuid)');
    if (
      (updTrack.artistId && !validate(updTrack.artistId)) ||
      (updTrack.albumId && !validate(updTrack.albumId))
    )
      throw new BadRequestException('invalid dto');
    const updatedTrack = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!updatedTrack) throw new NotFoundException('track does not exist');
    return await this.prisma.track.update({
      data: updTrack,
      where: { id: trackId },
    });
  }

  async deleteTrack(trackId: string) {
    if (!validate(trackId))
      throw new BadRequestException('trackId is invalid (not uuid)');
    const delTrack = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!delTrack) throw new NotFoundException('track does not exist');
    await this.prisma.track.delete({ where: { id: trackId } });
  }
}
