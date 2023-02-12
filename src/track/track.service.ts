import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { Errors } from 'src/utils/const';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    private db: DbService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    if (
      ((typeof createTrackDto.artistId === 'string' &&
        createTrackDto.artistId.length !== 0) ||
        (typeof createTrackDto.artistId !== 'string' &&
          createTrackDto.artistId === null)) &&
      ((typeof createTrackDto.albumId === 'string' &&
        createTrackDto.albumId.length !== 0) ||
        (typeof createTrackDto.albumId !== 'string' &&
          createTrackDto.albumId === null))
    ) {
      let artistId = null;
      let albumId = null;
      const artist = this.db.artists.find(
        (item) => item.id === createTrackDto.artistId,
      );

      const album = this.db.albums.find(
        (item) => item.id === createTrackDto.albumId,
      );

      if (artist) {
        artistId = createTrackDto.artistId;
      }

      if (album) {
        albumId = createTrackDto.albumId;
      }

      const newTrack = new Track(
        uuidv4(),
        createTrackDto.name,
        artistId,
        albumId,
        createTrackDto.duration,
      );
      this.db.tracks.push(newTrack);
      return newTrack;
    } else {
      throw new BadRequestException(
        'check fields: artistId / albumId should not be empty, artistId / albumId must be a string or null',
      );
    }
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(Errors.TrackNotFound);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.db.tracks.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(Errors.TrackNotFound);
    }

    if (
      ((typeof updateTrackDto.artistId === 'string' &&
        updateTrackDto.artistId.length !== 0) ||
        (typeof updateTrackDto.artistId !== 'string' &&
          updateTrackDto.artistId === null)) &&
      ((typeof updateTrackDto.albumId === 'string' &&
        updateTrackDto.albumId.length !== 0) ||
        (typeof updateTrackDto.albumId !== 'string' &&
          updateTrackDto.albumId === null))
    ) {
      let artistId = null;
      let albumId = null;
      const artist = this.db.artists.find(
        (item) => item.id === updateTrackDto.artistId,
      );

      const album = this.db.albums.find(
        (item) => item.id === updateTrackDto.albumId,
      );

      if (artist) {
        artistId = updateTrackDto.artistId;
      }

      if (album) {
        albumId = updateTrackDto.albumId;
      }

      const track = this.db.tracks[index];
      track.name = updateTrackDto.name;
      track.albumId = albumId;
      track.artistId = artistId;
      track.duration = updateTrackDto.duration;

      return track;
    } else {
      throw new BadRequestException(
        'check fields: artistId / albumId should not be empty, artistId / albumId must be a string or null',
      );
    }
  }

  remove(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(Errors.TrackNotFound);
    }
    this.db.tracks = this.db.tracks.filter((item) => item.id !== id);

    this.favsService.removeTrack(id, true);
  }
}
