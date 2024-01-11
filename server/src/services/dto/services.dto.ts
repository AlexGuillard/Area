import { ApiProperty } from '@nestjs/swagger';
import { ServiceType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class ServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refresh_token: string;

  @ApiProperty()
  @IsEnum(ServiceType)
  typeService: ServiceType;
}
