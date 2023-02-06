import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.createTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.createAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.createArtist(id);
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeArtist(id);
  }
}
