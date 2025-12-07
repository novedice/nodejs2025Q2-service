import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
// import tracks from './track.repository';
import { validate } from 'uuid';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
// import { favsTracksIds } from 'src/favorites/favorites.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}
  async getTracks() {
    return this.prisma.track.findMany();
    // return tracks;
  }
  async getTrack(trackId: string) {
    if (!validate(trackId))
      throw new BadRequestException('trackId is invalid (not uuid)');
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    // const track = tracks.find((track) => track.id === trackId);
    if (!track) throw new NotFoundException('track does not exist');
    return track;
  }
  async createTrack(newTrack: CreateTrackDto) {
    if (!newTrack.duration || !newTrack.name)
      throw new BadRequestException('invalid dto');
    // const track = {
    //   ...newTrack,
    //   id: v4(),
    // };
    // tracks.push(track);
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
    // const index = tracks.findIndex((track) => track.id === trackId);
    if (!updatedTrack) throw new NotFoundException('track does not exist');
    // const updatedTrack = {
    //   id: trackId,
    //   name: updTrack.name ?? tracks[index].name,
    //   albumId: updTrack.albumId ?? tracks[index].albumId,
    //   artistId: updTrack.artistId ?? tracks[index].artistId,
    //   duration: updTrack.duration ?? tracks[index].duration,
    // };
    // tracks[index] = updatedTrack;
    // return updatedTrack;
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
    // const index = tracks.findIndex((track) => track.id === trackId);
    if (!delTrack) throw new NotFoundException('track does not exist');
    await this.prisma.track.delete({ where: { id: trackId } });
    // tracks.splice(index, 1);
    // const favsInd = favsTracksIds.findIndex((id) => id === trackId);
    // if (favsInd !== -1) favsTracksIds.splice(favsInd, 1);
  }
}
