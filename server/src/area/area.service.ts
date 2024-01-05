import { ForbiddenException, Injectable, Ip, NotFoundException } from '@nestjs/common';
import { MeService } from '../me/me.service';
import { PrismaService } from '../prisma/prisma.service';
import { AreaDto, NewAreaDto } from './dto';
import { AboutService } from '../about/about.service';
import { ServiceType } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AreaService {
  constructor(
    private me: MeService,
    private prisma: PrismaService,
    private about: AboutService,
    private eventEmitter: EventEmitter2, 
  ) {}

  findServiceName(actionReactionName: string, isAction: boolean): ServiceType {
    const infos = this.about.getAbout(Ip());
    const matchingService = infos.server.services.find((service) => {
      let matchingEvent = false;
      if (isAction) {
        matchingEvent = service.actions.some(
          (action) => action.name === actionReactionName,
        );
      } else {
        matchingEvent = service.reactions.some(
          (reaction) => reaction.name === actionReactionName,
        );
      }

      return matchingEvent;
    });

    if (matchingService) {
      return matchingService.name as ServiceType;
    }
    throw new ForbiddenException("This action or reaction doesn't exist");
  }

  getStructUser(object: {}) {
    const allPropertyNames = Object.keys(object) as (keyof typeof object)[];
    for (var j=0; j<allPropertyNames.length; j++) {
      console.log(allPropertyNames[j])
      const key = allPropertyNames[j] as string
      const data = object[key]
      let variableType = typeof data
      console.log(key + ": " + data + " and is of type " + variableType)
    }
  }

  async checkActionStringParameter(
    actionName: string,
    actionParameter: JSON,
  ) {
    const struct = {}
    this.eventEmitter.emit(actionName + '.struct', struct);
    this.getStructUser(actionParameter);
    console.log(JSON.stringify(struct));
  }

  async getAreas(token: string) {
    const allAreas: AreaDto[] = [];
    const user = await this.me.getUser(token);
    const area = await this.prisma.area.findMany({
      where: {
        userId: user.id,
      },
    });
    for (const a of area) {
      allAreas.push({
        id: a.id,
        nameArea: a.name,
      });
    }
    return allAreas;
  }
  async getArea(token: string, id: string): Promise<NewAreaDto> {
    const user = await this.me.getUser(token);
    const idArea = parseInt(id);
    if (isNaN(idArea)) {
      throw new NotFoundException('This area does not exist');
    }
    const area = await this.prisma.area.findUnique({
      where: {
        userId: user.id,
        id: idArea,
      },
    });

    if (!area) {
      throw new NotFoundException('This area does not exist');
    }
    const action = await this.prisma.action.findUnique({
      where: {
        id: area.actionId,
      },
    });
    if (!action) {
      throw new NotFoundException('This area does not contain an action');
    }
    const reaction = await this.prisma.reaction.findUnique({
      where: {
        id: area.reactionId,
      },
    });
    if (!reaction) {
      throw new NotFoundException('This area does not contain a reaction');
    }
    const AreaDto: NewAreaDto = {
      nameArea: area.name,
      nameAction: action.name,
      actionParameter: JSON.parse(action.stringParameter.toString()),
      nameReaction: reaction.name,
      reactionParameter: JSON.parse(reaction.stringParameter.toString()),
    }
    return AreaDto;
  }

  async setAreas(token: string, body: NewAreaDto) {
    const user = await this.me.getUser(token);
    const serviceActionName = this.findServiceName(body.nameAction, true);
    const serviceAction = await this.prisma.services.findUnique({
      where: {
        UniqueUserService: {
          userId: user.id,
          typeService: serviceActionName,
        },
      },
    });
    const serviceReactionName = this.findServiceName(body.nameReaction, false);
    const serviceReaction = await this.prisma.services.findUnique({
      where: {
        UniqueUserService: {
          userId: user.id,
          typeService: serviceActionName,
        },
      },
    });
    if (!serviceAction) {
      throw new ForbiddenException(
        'You are not connected to the service ' + serviceActionName,
      );
    } else if (!serviceReaction) {
      throw new ForbiddenException(
        'You are not connected to the service ' + serviceReactionName,
      );
    }
    this.checkActionStringParameter(body.nameAction, body.actionParameter);
    const action = await this.prisma.action.create({
      data: {
        name: body.nameAction,
        stringParameter: JSON.parse(body.actionParameter.toString()),
        serviceId: serviceAction.id,
      },
    });
    const reaction = await this.prisma.reaction.create({
      data: {
        name: body.nameReaction,
        stringParameter: JSON.parse(body.reactionParameter.toString()),
        serviceId: serviceReaction.id,
      },
    });
    const area = await this.prisma.area.create({
      data: {
        name: body.nameArea,
        userId: user.id,
        actionId: action.id,
        reactionId: reaction.id,
      },
      select: {
        name: true,
      },
    });
    return area;
  }
}
