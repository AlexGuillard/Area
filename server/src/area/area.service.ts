import { Injectable } from '@nestjs/common';
import { MeService } from '../me/me.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AreaDto, NewAreaDto } from './dto';

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

    async setAreas(token: string, body: NewAreaDto) {
        const user = await this.me.getUser(token);
        const serviceAction = await this.prisma.services.findUnique({
            where: {
                typeService: body.nameServiceAction,
            },
        });
        const serviceReaction = await this.prisma.services.findUnique({
            where: {
                typeService: body.nameServiceReaction,
            },
        });
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
