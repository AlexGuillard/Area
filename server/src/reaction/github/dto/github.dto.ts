import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReactionGithubDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  repository: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  owner: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;
}
