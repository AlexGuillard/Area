import { ApiProperty } from '@nestjs/swagger';
import { ServiceType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ReactionDescriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(ServiceType)
  typeService: ServiceType;
}
