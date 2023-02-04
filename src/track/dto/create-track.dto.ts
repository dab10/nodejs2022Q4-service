import { IsInt, IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @NotEquals(undefined, {
    message: 'artistId should not be empty, artistId must be a string or null',
  })
  artistId: string | null;

  @NotEquals(undefined, {
    message: 'albumId should not be empty, albumId must be a string or null',
  })
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
