import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ActionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
    @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  actionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  reactionId: number;
}

export class ActionDescriptionDto {
    @ApiProperty()
    @IsNotEmpty()
      @IsString()
    name: string;
  
    @ApiProperty()
    @IsNotEmpty()
      @IsString()
    description: string;
  }
  