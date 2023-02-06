import { IsInt, IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @NotEquals(undefined, {
    message: 'artistId should not be empty, artistId must be a string or null',
  })
  artistId: string | null;
}
