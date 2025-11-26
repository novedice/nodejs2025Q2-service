import { Controller, Delete, Get, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs/*')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }
  @Post()
  postFavTrack() {
    return this.favoritesService.postFavTrack();
  }
  postFavAlbum() {
    return this.favoritesService.postFavAlbum();
  }
  postFavArtist() {
    return this.favoritesService.postFavArtist();
  }
  @Delete()
  deleteFavTrack() {
    return this.favoritesService.deleteFavTrack();
  }
  deleteFavAlbum() {
    return this.favoritesService.deleteFavAlbum();
  }
  deleteFavArtist() {
    return this.favoritesService.deleteFavArtist();
  }
}
