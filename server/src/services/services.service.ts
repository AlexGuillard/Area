import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeService } from '../me/me.service';
import { ServiceDto } from './dto';

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
  async connexionService(randomToken: string, body: ServiceDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        randomToken: randomToken,
      },
    });
    if (!user) {
      throw new ForbiddenException(
        'mail not found. Please register with the same email as the one you are connected',
      );
    }
    const service = await this.prisma.services.findUnique({
      where: {
        UniqueUserService: {
          userId: user.id,
          typeService: body.typeService,
        },
      },
    });
    if (!service) {
      await this.prisma.services.create({
        data: {
          token: body.token,
          refreshToken: body.refresh_token,
          typeService: body.typeService,
          userId: user.id,
        },
      });
    } else {
      await this.prisma.services.update({
        where: {
          id: service.id,
        },
        data: {
          token: body.token,
          refreshToken: body.refresh_token,
        },
      });
    }
  }
}
