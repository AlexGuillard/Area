import { HttpService } from '@nestjs/axios';
import { Injectable, Ip } from '@nestjs/common';
import { MeService } from '../me/me.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ReactionDescriptionDto } from './dto';
import { AboutService } from '../about/about.service';

@Injectable()
export class ReactionService {
    constructor(
        private httpService: HttpService,
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
        ).reactions;
        allReactions.push(...reactions);
      }
      return allReactions;
    }

    // when adding a new reaction, make a @onEvent(name in about.json) before
}
