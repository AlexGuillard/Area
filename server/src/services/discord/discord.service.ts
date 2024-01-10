import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { ServiceType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscordService {
  constructor(private prisma: PrismaService) {}

  async discordValidate(@Request() req: any, @Res() res: any) {
    const email = req.user.email;
    const accessToken = req.user.accessToken;
    const refreshToken = req.user.refreshToken;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.redirect(`${process.env.WEB_URL}/Area`);
      throw new ForbiddenException(
        'mail not found. Please register with the same email as the one you are connected',
      );
    }

    const service = await this.prisma.services.findUnique({
      where: {
        userId: user.id,
        token: accessToken,
      },
    });
    if (!service) {
      await this.prisma.services.create({
        data: {
          token: accessToken,
          refreshToken: refreshToken,
          typeService: ServiceType.DISCORD,
          userId: user.id,
        },
      });
    }
    res.redirect(`${process.env.WEB_URL}/Area`);
  }
}
