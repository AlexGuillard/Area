import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
