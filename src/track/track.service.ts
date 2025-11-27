import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import tracks from './track.repository';
import { v4, validate } from 'uuid';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TrackService {
  getTracks() {
    return tracks;
  }
  getTrack(trackId: string) {
    if (!validate(trackId)) throw new BadRequestException('trackId is invalid');
    const track = tracks.find((track) => track.id === trackId);
    if (!track) throw new NotFoundException('track does not exist');
    return track;
  }
  createTrack(newTrack: CreateTrackDto) {
    if (
      !newTrack.albumId ||
      !newTrack.artistId ||
      !newTrack.duration ||
      !newTrack.name
    )
      throw new BadRequestException('invalid dto');
    const track = {
      ...newTrack,
      id: v4(),
    };
    tracks.push(track);
    return track;
  }
  updateTrack(trackId: string, updTrack: UpdateTrackDto) {
    if (!validate(trackId))
      throw new BadRequestException('trackId is not valid');
    const index = tracks.findIndex((track) => track.id === trackId);
    if (index === -1) throw new NotFoundException('track does not exist');
    const updatedTrack = {
      id: trackId,
      name: updTrack.name ? updTrack.name : tracks[index].name,
      albumId: updTrack.albumId ? updTrack.albumId : tracks[index].albumId,
      artistId: updTrack.artistId ? updTrack.artistId : tracks[index].artistId,
      duration: updTrack.duration ? updTrack.duration : tracks[index].duration,
    };
    tracks[index] = updatedTrack;
    return updatedTrack;
  }
  deleteTrack(trackId: string) {
    if (!validate(trackId))
      throw new BadRequestException('trackId is not valid');
    const index = tracks.findIndex((track) => track.id === trackId);
    if (index === -1) throw new NotFoundException('track does not exist');
    tracks.splice(index, 1);
  }
}
