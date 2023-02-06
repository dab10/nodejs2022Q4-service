import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DbService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';
import { Errors } from 'src/utils/const';
import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    private db: DbService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  createTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException(Errors.TrackNotFound);
    }
    if (!this.db.favs.tracks.includes(track)) this.db.favs.tracks.push(id);
    return { message: 'Track successfully added' };
  }

  createAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException(Errors.AlbumNotFound);
    }
    if (!this.db.favs.albums.includes(album)) this.db.favs.albums.push(id);
    return { message: 'Album successfully added' };
  }

  createArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException(Errors.ArtistNotFound);
    }
    if (!this.db.favs.artists.includes(artist)) this.db.favs.artists.push(id);
    return { message: 'Artist successfully added' };
  }

  findAll() {
    const artists = this.db.favs.artists.map((id) =>
      this.artistService.findOne(id),
    );

    const albums = this.db.favs.albums.map((id) =>
      this.albumService.findOne(id),
    );

    const tracks = this.db.favs.tracks.map((id) =>
      this.trackService.findOne(id),
    );

    const favorites = new Fav(artists, albums, tracks);

    return favorites;
  }

  removeTrack(id: string, skipHttpError = false) {
    const track = this.db.favs.tracks.find((item) => item === id);
    if (!track && !skipHttpError) {
      throw new NotFoundException(Errors.TrackNotFav);
    }
    this.db.favs.tracks = this.db.favs.tracks.filter((item) => item !== id);
  }

  removeAlbum(id: string, skipHttpError = false) {
    const album = this.db.favs.albums.find((item) => item === id);
    if (!album && !skipHttpError) {
      throw new NotFoundException(Errors.AlbumNotFav);
    }
    this.db.favs.albums = this.db.favs.albums.filter((item) => item !== id);
  }

  removeArtist(id: string, skipHttpError = false) {
    const artist = this.db.favs.artists.find((item) => item === id);
    if (!artist && !skipHttpError) {
      throw new NotFoundException(Errors.ArtistNotFav);
    }
    this.db.favs.artists = this.db.favs.artists.filter((item) => item !== id);
  }
}
