import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from 'src/db/db.module';
import { TrackModule } from 'src/track/track.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [
    DbModule,
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
