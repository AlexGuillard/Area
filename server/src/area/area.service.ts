import { ForbiddenException, Injectable, Ip } from '@nestjs/common';
import { MeService } from '../me/me.service';
import { PrismaService } from '../prisma/prisma.service';
import { AreaDto, NewAreaDto } from './dto';
import { AboutService } from '../about/about.service';
import { ServiceType } from '@prisma/client';

@Injectable()
export class AreaService {
  constructor(
    private me: MeService,
    private prisma: PrismaService,
    private about: AboutService,
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
    const action = await this.prisma.action.create({
      data: {
        name: body.nameAction,
        stringParameter: body.actionParameter,
        serviceId: serviceAction.id,
      },
    });
    const reaction = await this.prisma.reaction.create({
      data: {
        name: body.nameReaction,
        stringParameter: body.reactionParameter,
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
