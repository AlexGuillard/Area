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
    async ActionExecuteTime(structInfo: TimeDto, actionId: number) {
        const action = await this.actionService.getAction(actionId);
        let saveParams = action.saveParams as unknown as TimeDto;
        const stringDate = await this.getTime();
        const date = new Date(stringDate).getMinutes();
        if (saveParams == null) {
            saveParams = new TimeDto();
            saveParams.MinutesTime = date;
        }
        if (date === structInfo.MinutesTime && saveParams.MinutesTime !== structInfo.MinutesTime) {
            saveParams.MinutesTime = date;
            this.actionService.executeReaction('ExecuteTime', structInfo);
        } else if (date !== structInfo.MinutesTime) {
            saveParams.MinutesTime = date;
        }
        await this.actionService.updateAction(actionId, saveParams);
    }
}
