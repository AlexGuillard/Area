import { ForbiddenException, Injectable } from '@nestjs/common';
import { Profile } from 'passport-spotify';
import { PrismaService } from '../../prisma/prisma.service';
import { SpotifyUserDto } from './dto';
import { ServiceType } from '.prisma/client';

@Injectable()
export class SpotifyAuthService {
  constructor(private readonly prisma: PrismaService) {}

  async handleSpotifyAuthCallback(user: Profile, authInfo: any) {

    const userEmail = user.emails && user.emails.length > 0 ? user.emails[0].value : undefined;

    const spotifyUserDto = new SpotifyUserDto({
      provider: 'spotify',
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      profileUrl: user.profileUrl,
      photos: user.photos,
      country: user.country,
      followers: user.followers,
      product: user.product,
      email: userEmail,
      accessToken: authInfo.accessToken,
      refreshToken: authInfo.refreshToken,
      expires_in: authInfo.expires_in,
    });

    const userDB = await this.prisma.user.findUnique({
      where: {
        email: spotifyUserDto.email,
      },
    });

    if (!userDB) {
      throw new ForbiddenException('Mail not found while creating Spotify service');
    }

    await this.prisma.services.create({
      data: {
        token: spotifyUserDto.accessToken,
        refreshToken: spotifyUserDto.refreshToken,
        typeService: ServiceType.SPOTIFY,
        userId: userDB.id,
      },
    });

  }
}