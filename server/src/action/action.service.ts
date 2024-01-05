import { MeService } from '../me/me.service';
import { Injectable, Ip, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ActionDescriptionDto, ActionDto } from './dto';
import { AboutService } from '../about/about.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ActionService {
  constructor(
    private me: MeService,
    private prisma: PrismaService,
    private about: AboutService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async executeActions() {
    const actions = await this.prisma.action.findMany();
    for (const action of actions) {
      this.eventEmitter.emit(action.name, action.parameters);
    }
  }

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
      );
      if (actions != undefined) {
        allActions.push(...actions.actions);
      }
    }
    return allActions;
  }

  async getActionInfo(token: string, nameAction: string) {
    await this.me.getUser(token);
    let structInfo = {};
    const res = this.eventEmitter.emit(nameAction + ".struct", structInfo)
    if (res === false) {
      throw new NotFoundException('Action not found');
    }
    return structInfo;
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
    return areas;
  }

  async executeReaction(nameAction: string, structInfo: any) {
    const areas = await this.getAreas(nameAction);
    for (const area of areas) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: area.userId,
        },
      });
      const reaction = await this.prisma.reaction.findUnique({
        where: {
          id: area.reactionId,
        },
      });
      if (reaction.parameters === structInfo) {
        this.eventEmitter.emit(
          reaction.name, reaction.parameters, user.randomToken);
      }
    }
  }
}
