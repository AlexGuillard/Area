import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class TimeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  MinutesTime: number;
}
