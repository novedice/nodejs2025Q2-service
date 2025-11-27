export interface CreateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
