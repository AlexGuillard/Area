import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DiscordSendMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name_server: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name_channel: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class DiscordSendMessageUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_user: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
