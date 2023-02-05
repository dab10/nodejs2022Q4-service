import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './entities/artist.entity';
import { Errors } from 'src/utils/const';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private db: DbService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist(
      uuidv4(),
      createArtistDto.name,
      createArtistDto.grammy,
    );
    this.db.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(Errors.ArtistNotFound);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = this.db.artists.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(Errors.ArtistNotFound);
    }
    const artist = this.db.artists[index];
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  remove(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(Errors.ArtistNotFound);
    }
    this.db.artists = this.db.artists.filter((item) => item.id !== id);

    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        const updateTrackDto = {
          id: track.id,
          name: track.name,
          artistId: null,
          albumId: track.albumId,
          duration: track.duration,
        };
        this.trackService.update(track.id, updateTrackDto);
      }
    });

    const albums = this.albumService.findAll();
    albums.forEach((album) => {
      if (album.albumId === id) {
        const updateAlbumDto = {
          id: album.id,
          name: album.name,
          year: album.year,
          artistId: null,
        };
        this.albumService.update(album.id, updateAlbumDto);
      }
    });
  }
}
