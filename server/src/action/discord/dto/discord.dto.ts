import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DiscordMessagesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name_server: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name_channel: string;
}

export class LastMessageDto {
  @ApiProperty()
  @IsString()
  last_message_id: number;
}
