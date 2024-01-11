import { ApiProperty } from "@nestjs/swagger";

export class SpotifyArtistNameDto {
    @ApiProperty()
    id: string;
}

export class SpotifyMusicDto {
    @ApiProperty()
    id: string;
}