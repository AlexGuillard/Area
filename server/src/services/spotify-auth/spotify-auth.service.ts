import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-spotify';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SpotifyAuthService {
  constructor(private readonly prisma: PrismaService) {}

  async handleSpotifyAuthCallback(user: Profile) {
    const payload = {
      name: user.username,
      sub: user.id,
    };
  }
}