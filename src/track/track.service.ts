import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { Errors } from 'src/utils/const';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

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
      const isIncludeArtistId = this.db.artists.includes(
        createTrackDto.artistId,
      );
      // TODO DB ALBUMS
      const isIncludeAlbumId = this.db.artists.includes(createTrackDto.albumId);

      if (isIncludeArtistId) {
        artistId = createTrackDto.artistId;
      }

      if (isIncludeAlbumId) {
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
    return `This action returns all track`;
  }

  findOne(id: string) {
    return `This action returns a #${id} track`;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: string) {
    return `This action removes a #${id} track`;
  }
}
