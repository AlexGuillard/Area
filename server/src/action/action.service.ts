import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class ActionService {
    constructor(private httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<any>> {
    return this.httpService.get('http://localhost:8080/about.json').pipe(
        map((response: AxiosResponse) => response.data),
      );
  }
}
