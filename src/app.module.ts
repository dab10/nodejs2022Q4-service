import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';


const POSTGRES_PORT = +process.env.POSTGRES_PORT || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;

const connectionSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || "dab10",
  password: process.env.POSTGRES_PASSWORD || "111111",
  database: process.env.POSTGRES_DB || "db",
  entities: ["dist/**/*.entity.js"],
  synchronize: true,
  migrations: ["dist/**/migrations/*.js"],
})

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionSource.options),
    UserModule,
    DbModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
