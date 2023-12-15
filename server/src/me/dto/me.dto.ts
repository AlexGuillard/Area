import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class MeDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  mail: string;
}
