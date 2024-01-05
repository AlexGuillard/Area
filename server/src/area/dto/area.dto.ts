import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AreaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameArea: string;
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
  @IsJSON()
  actionParameter: JSON;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameReaction: string;

  @ApiProperty()
  @IsJSON()
  reactionParameter: JSON;
}
