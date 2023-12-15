import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeDto } from './dto/me.dto';

@Injectable()
export class MeService {
    constructor(private prisma: PrismaService) {
    }

    async getMe(token: string) {
        const user = await this.prisma.user.findUnique({
          where: {
            randomToken: token,
          },
        })
        if (!user) {
          throw new ForbiddenException("token not found");
        }
        const res = new MeDto();
        res.id = user.id;
        res.mail = user.email;
        return res;
    }
}
