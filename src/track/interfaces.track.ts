export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface TrackDto {
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
}

export interface UpdateTrack {
  name?: string;
  artistId?: string;
  albumId?: string;
  duration?: number;
}
