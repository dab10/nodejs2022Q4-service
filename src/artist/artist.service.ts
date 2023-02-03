import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './entities/artist.entity';
import { Errors } from 'src/utils/const';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

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
  }
}
