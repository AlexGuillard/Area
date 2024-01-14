import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class TimeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  MinutesTime: number;
}

export class CouldownDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  MinutesTime: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  date: number;
}
