import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class MeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  mail: string;
}
