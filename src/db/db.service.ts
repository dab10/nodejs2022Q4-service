import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  users = [];
  artists = [];
  tracks = [];
  albums = [];
  favs = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
