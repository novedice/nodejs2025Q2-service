import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  getTracks() {
    return 'tracks';
  }
  getTrack(trackId: string) {
    return `track with id ${trackId}`;
  }
  postTrack() {}
  putTrack() {}
  deleteTrack() {}
}
