import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeService } from '../me/me.service';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
    private me: MeService,
  ) {}

  async getServices(token: string) {
    const user = await this.me.getUser(token);
    const services = await this.prisma.services.findMany({
      where: {
        userId: user.id,
      },
      select: {
        typeService: true,
      },
    });
    return services;
  }
}
