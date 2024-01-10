import { ApiProperty } from "@nestjs/swagger";

export class SpotifyPlaybackStateDto {
    @ApiProperty()
    is_playing: boolean;
}
