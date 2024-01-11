import { ApiProperty } from "@nestjs/swagger";

export class OpenweatherDto {
    city: string;
    temperature: number;
    operation: boolean;
}