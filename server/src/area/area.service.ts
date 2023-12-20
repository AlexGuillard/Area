import { Injectable } from '@nestjs/common';
import { MeService } from '../me/me.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AreaDto } from './dto';

@Injectable()
export class AreaService {
    constructor(private me: MeService, private prisma: PrismaService) {}

    async getAreas(token: string) {
        let allAreas: AreaDto[] = [];
        const user = await this.me.getUser(token);
        const area = await this.prisma.area.findMany({
            where: {
                userId: user.id,
            },
        });
        for (const a of area) {
            const action = await this.prisma.action.findUnique({
                where: {
                    id: a.actionId,
                },
            });
            const reaction = await this.prisma.reaction.findUnique({
                where: {
                    id: a.reactionId,
                },
            });
            allAreas.push({
                nameArea: a.name,
                nameAction: action.name,
                nameReaction: reaction.name,
            });
        }
        return allAreas;
    }
}
