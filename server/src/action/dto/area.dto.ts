import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AreaDto {
  @ApiProperty()
  @IsNotEmpty()
    @IsString()
  nameAction: string;

  @ApiProperty()
  @IsNotEmpty()
    @IsString()
  nameReaction: string;
}
