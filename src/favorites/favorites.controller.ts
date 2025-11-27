import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }
  @Post(':type/:id')
  @HttpCode(201)
  addToFavotite(@Param('type') type: string, @Param('id') id: string) {
    if (type === 'track') return this.favoritesService.addFavTrack(id);
    if (type === 'album') return this.favoritesService.addFavAlbum(id);
    if (type === 'artist') return this.favoritesService.addFavArtist(id);
  }
  @Delete(':type/:id')
  @HttpCode(204)
  deleteFromFav(@Param('type') type: string, @Param('id') id: string) {
    if (type === 'track') return this.favoritesService.deleteFavTrack(id);
    if (type === 'album') return this.favoritesService.deleteFavAlbum(id);
    if (type === 'artist') return this.favoritesService.deleteFavArtist(id);
  }
}
