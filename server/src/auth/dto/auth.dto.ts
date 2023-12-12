import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
