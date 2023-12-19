import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, firstValueFrom, map } from 'rxjs';
import { MeService } from '../me/me.service';

@Injectable()
export class ActionService {
        constructor(private httpService: HttpService, private me: MeService) {}

    async getTime(): Promise<string> {
        const date = await firstValueFrom(this.httpService.get('http://worldtimeapi.org/api/timezone/Europe/Paris'));
        return String(date.data.datetime);
    }
    async findAll(token: string) {
        await this.me.getUser(token);
        const stringDate = await this.getTime();
        const date = new Date(stringDate).getMinutes();
        console.log(date);
        return date;
    }
}
