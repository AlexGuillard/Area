import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MeService } from '../me/me.service';
import { Injectable, Ip } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ActionDescriptionDto, ActionDto } from './dto';
import { AboutService } from '../about/about.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ActionService {
  constructor(
    private httpService: HttpService,
    private me: MeService,
    private prisma: PrismaService,
    private about: AboutService,
    private eventEmitter: EventEmitter2,
  ) {}
  private previousDate: number;

  async getActions(token: string) {
    const allActions: ActionDescriptionDto[] = [];
    const user = await this.me.getUser(token);
    const infos = this.about.getAbout(Ip());
    const services = await this.prisma.services.findMany({
      where: {
        userId: user.id,
      },
    });
    for (const service of services) {
      const actions = infos.server.services.find(
        (s) => s.name === service.typeService,
      ).actions;
      allActions.push(...actions);
    }
    return allActions;
  }

  async getAreas(name: string): Promise<any> {
    const areas: ActionDto[] = [];
    const actions = await this.prisma.action.findMany({
      where: {
        name: name,
      },
    });
    for (const action of actions) {
      const actionAreas = await this.prisma.area.findMany({
        where: {
          actionId: action.id,
        },
      });
      areas.push(...actionAreas);
    }
    console.log('every area with ' + name + ': ' + areas);
    return areas;
  }

  async getTime(): Promise<string> {
    const date = await firstValueFrom(
      this.httpService.get('http://worldtimeapi.org/api/timezone/Europe/Paris'),
    );
    return String(date.data.datetime);
  }

  async executeReaction(nameAction: string) {
    const areas = await this.getAreas(nameAction);
    for (const area of areas) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: area.userId,
        },
      });
      //   to use when using name of reaction for onEvent
      //   const reaction = await this.prisma.reaction.findUnique({
      //     where: {
      //       id: area.reactionId,
      //     },
      //   });
      // change order.created with name of reaction from onEvent
      this.eventEmitter.emit(
        'order.created',
        'subject',
        user.email,
        'action',
        user.email,
        '158',
      );
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async ActionsetTimer() {
    const stringDate = await this.getTime();
    const date = new Date(stringDate).getMinutes();
    if (date !== this.previousDate && this.previousDate !== undefined) {
      this.executeReaction('setTimer');
    }
    this.previousDate = date;
    return date;
  }
}
