import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from 'auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from 'auth/auth.guard';

@Module({
  imports: [
    UserModule,
    TrackModule,
    FavoritesModule,
    AlbumModule,
    ArtistModule,
    PrismaModule,
    AuthModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  // ],
})
export class AppModule {}
