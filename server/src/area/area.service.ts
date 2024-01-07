import { ForbiddenException, Injectable, Ip, NotFoundException } from '@nestjs/common';
import { MeService } from '../me/me.service';
import { PrismaService } from '../prisma/prisma.service';
import { AreaDto, NewAreaDto } from './dto';
import { AboutService } from '../about/about.service';
import { Prisma, ServiceType } from '@prisma/client';
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

  checkStructUser(object: JSON, actualStruct: Record<string, any>) {
    const allObjectNames = Object.keys(object) as (keyof typeof object)[];
    const allstructNames = Object.keys(actualStruct) as (keyof typeof actualStruct)[];

    if (allObjectNames.length !== allstructNames.length) {
      throw new ForbiddenException('Wrong number of parameters. we need ' + JSON.stringify(actualStruct));
    }
    for (var j = 0; j < allObjectNames.length; j++) {
      const key = allObjectNames[j] as string
      const structKey = allstructNames[j] as string
      if (key !== structKey) {
        throw new ForbiddenException('Wrong parameter name. we need ' + JSON.stringify(actualStruct));
      }
      const variableType = typeof object[key]
      const structType = typeof actualStruct[structKey]
      if (variableType !== structType) {
        throw new ForbiddenException('Wrong parameter type. we need ' + JSON.stringify(actualStruct));
      }
    }
  }

  checkStringParameter(
    name: string,
    parameter: JSON,
  ) {
    const struct = {}
    const res = this.eventEmitter.emit(name + '.struct', struct);
    if (res === false) {
      throw new NotFoundException('Action or reaction not found');
    }
    this.checkStructUser(parameter, struct);
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
      actionParameter: action.parameters as unknown as JSON,
      nameReaction: reaction.name,
      reactionParameter: reaction.parameters as unknown as JSON,
    }
    return AreaDto;
  }

  async deleteArea(token: string, id: string) {
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
      include: {
        Action: true,
        Reaction: true,
      },
    });
    if (!area) {
      throw new NotFoundException('This area does not exist');
    }
    await this.prisma.action.deleteMany({
      where: {
        id: area.actionId,
      },
    });
    await this.prisma.reaction.deleteMany({
      where: {
        id: area.reactionId,
      },
    });
    await this.prisma.area.deleteMany({
      where: {
        id: idArea,
      },
    });
    return 'Area deleted';
  }

  async changeArea(token: string, idArea: string, body: NewAreaDto) {
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
          typeService: serviceReactionName,
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
    this.checkStringParameter(body.nameAction, body.actionParameter);
    this.checkStringParameter(body.nameReaction, body.reactionParameter);
    let area = await this.prisma.area.findUnique({
      where: {
        userId: user.id,
        id: parseInt(idArea),
      },
    });
    const action = await this.prisma.action.update({
      where: {
        id: area.id,
      },
      data: {
        name: body.nameAction,
        parameters: body.actionParameter as unknown as Prisma.JsonValue,
        serviceId: serviceAction.id,
      },
    });
    const reaction = await this.prisma.reaction.update({
      where: {
        id: area.id,
      },
      data: {
        name: body.nameReaction,
        parameters: body.reactionParameter as unknown as Prisma.JsonValue,
        serviceId: serviceReaction.id,
      },
    });
    area = await this.prisma.area.update({
      where: {
        id: area.id,
      },
      data: {
        name: body.nameArea,
        userId: user.id,
        actionId: action.id,
        reactionId: reaction.id,
      },
    });
    return { "name": area.name };
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
          typeService: serviceReactionName,
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
    this.checkStringParameter(body.nameAction, body.actionParameter);
    this.checkStringParameter(body.nameReaction, body.reactionParameter);
    const action = await this.prisma.action.create({
      data: {
        name: body.nameAction,
        parameters: body.actionParameter as unknown as Prisma.JsonValue,
        serviceId: serviceAction.id,
      },
    });
    const reaction = await this.prisma.reaction.create({
      data: {
        name: body.nameReaction,
        parameters: body.reactionParameter as unknown as Prisma.JsonValue,
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
