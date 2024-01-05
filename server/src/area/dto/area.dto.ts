import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

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
  @IsObject()
  @ValidateNested()
  actionParameter: JSON;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameReaction: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  reactionParameter: JSON;
}
