import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  users = [];
  artists = [];
  tracks = [];
  albums = [];
}
