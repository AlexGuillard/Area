import { Injectable, Ip, NotFoundException } from '@nestjs/common';
import { MeService } from '../me/me.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ReactionDescriptionDto } from './dto';
import { AboutService } from '../about/about.service';

@Injectable()
export class ReactionService {
  constructor(
    private me: MeService,
    private prisma: PrismaService,
    private about: AboutService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getReactions(token: string) {
    const allReactions: ReactionDescriptionDto[] = [];
    const user = await this.me.getUser(token);
    const infos = this.about.getAbout(Ip());
    const services = await this.prisma.services.findMany({
      where: {
        userId: user.id,
      },
    });
    for (const service of services) {
      const reactions = infos.server.services.find(
        (s) => s.name === service.typeService,
      );
      if (reactions != undefined) {
        for (const action of reactions.reactions) {
          const newAction: ReactionDescriptionDto = {
            name: action.name,
            description: action.description,
            typeService: service.typeService,
          };
          allReactions.push(newAction);
        }
      }
    }
    return allReactions;
  }

  async getReactionInfo(token: string, nameReaction: string) {
    await this.me.getUser(token);
    let structInfo = {};
    const res = this.eventEmitter.emit(nameReaction + ".struct", structInfo)
    if (res === false) {
      throw new NotFoundException('Reaction not found');
    }
    return structInfo;
  }
}
