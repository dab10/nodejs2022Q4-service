import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { Errors } from 'src/utils/const';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    if (
      (typeof createAlbumDto.artistId === 'string' &&
        createAlbumDto.artistId.length !== 0) ||
      (typeof createAlbumDto.artistId !== 'string' &&
        createAlbumDto.artistId === null)
    ) {
      let artistId = null;

      const isIncludeArtistId = this.db.artists.includes(
        createAlbumDto.artistId,
      );

      if (isIncludeArtistId) {
        artistId = createAlbumDto.artistId;
      }

      const newAlbum = new Album(
        uuidv4(),
        createAlbumDto.name,
        createAlbumDto.year,
        artistId,
      );
      this.db.albums.push(newAlbum);
      return newAlbum;
    } else {
      if (
        typeof createAlbumDto.artistId === 'string' &&
        createAlbumDto.artistId.length === 0
      ) {
        throw new BadRequestException('artistId should not be empty');
      }
      if (typeof createAlbumDto.artistId !== 'string') {
        throw new BadRequestException('artistId must be a string or null');
      } else {
        throw new BadRequestException(
          'check field: artistId should not be empty, artistId must be a string or null',
        );
      }
    }
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(Errors.AlbumNotFound);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.db.albums.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(Errors.AlbumNotFound);
    }

    if (
      (typeof updateAlbumDto.artistId === 'string' &&
        updateAlbumDto.artistId.length !== 0) ||
      (typeof updateAlbumDto.artistId !== 'string' &&
        updateAlbumDto.artistId === null)
    ) {
      let artistId = null;

      const isIncludeArtistId = this.db.artists.includes(
        updateAlbumDto.artistId,
      );

      if (isIncludeArtistId) {
        artistId = updateAlbumDto.artistId;
      }

      const album = this.db.albums[index];
      album.name = updateAlbumDto.name;
      album.year = updateAlbumDto.year;
      album.artistId = artistId;

      return album;
    } else {
      if (
        typeof updateAlbumDto.artistId === 'string' &&
        updateAlbumDto.artistId.length === 0
      ) {
        throw new BadRequestException('artistId should not be empty');
      }
      if (typeof updateAlbumDto.artistId !== 'string') {
        throw new BadRequestException('artistId must be a string or null');
      } else {
        throw new BadRequestException(
          'check field: artistId should not be empty, artistId must be a string or null',
        );
      }
    }
  }

  remove(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(Errors.AlbumNotFound);
    }
    this.db.albums = this.db.albums.filter((item) => item.id !== id);
  }
}
