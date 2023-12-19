import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { MeService } from '../me/me.service';

@Injectable()
export class ActionService {
    constructor(private httpService: HttpService, private me: MeService) {}

  async findAll(token: string): Promise<Observable<AxiosResponse<any>>> {
    await this.me.getUser(token);
    return this.httpService.get('http://localhost:8080/about.json').pipe(
        map((response: AxiosResponse) => response.data),
      );
  }
}
