// user-token.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserTokenService {
  constructor(private readonly prisma: PrismaService) {}

  async saveGoogleToken(userId: number, accessToken: string, refreshToken: string): Promise<void> {
    await this.prisma.services.create({
      data: {
        userId: userId,
        typeService: 'GOOGLE',
        token: accessToken,
      },
    });
  }

  async getGoogleToken(userId: number): Promise<{ accessToken: string; refreshToken: string } | null> {
    const service = await this.prisma.services.findUnique({
      where: { userId: userId, typeService: 'GOOGLE' },
    });

    return service ? { accessToken: service.token, refreshToken: service.refreshToken || '' } : null;
  }
}
