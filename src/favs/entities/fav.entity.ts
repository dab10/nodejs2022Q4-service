import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';

export class Fav {
  artists: ArtistModule[];
  albums: AlbumModule[];
  tracks: TrackModule[];

  constructor(
    artists: ArtistModule[],
    albums: AlbumModule[],
    tracks: TrackModule[],
  ) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
