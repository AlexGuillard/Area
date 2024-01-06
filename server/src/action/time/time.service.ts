import { Injectable } from '@nestjs/common';
import { TimeDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ActionService } from '../action.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TimeService {
    constructor(
      private httpService: HttpService,
      private actionService: ActionService,
      private eventEmitter: EventEmitter2,
    ) {
        this.eventEmitter.on("ExecuteTime.struct", (struct: TimeDto) => {
            struct.MinutesTime = 0;
        })
    }

    async getTime(): Promise<string> {
      const date = await firstValueFrom(
        this.httpService.get('http://worldtimeapi.org/api/ip'),
      );
      return String(date.data.datetime);
    }

    @OnEvent('ExecuteTime')
    async ActionExecuteTime(structInfo: TimeDto) {
        const stringDate = await this.getTime();
        const date = new Date(stringDate).getMinutes();
        if (date === structInfo.MinutesTime) {
            this.actionService.executeReaction('ExecuteTime', structInfo);
        }
    }
}
