import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AreaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameArea: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameAction: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameReaction: string;
}

export class NewAreaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameArea: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameAction: string;

  @ApiProperty()
  @IsString()
  actionParameter: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameReaction: string;

  @ApiProperty()
  @IsString()
  reactionParameter: string;
}
