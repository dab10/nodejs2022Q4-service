import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

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
      this.db.tracks.push(newAlbum);
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
    return `This action returns all album`;
  }

  findOne(id: string) {
    return `This action returns a #${id} album`;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: string) {
    return `This action removes a #${id} album`;
  }
}
