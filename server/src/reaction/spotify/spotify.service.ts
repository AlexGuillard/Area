import { Injectable } from '@nestjs/common';
import { SpotifyArtistNameDto } from './dto/spotify.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceType } from '.prisma/client';

@Injectable()
export class SpotifyService {
    private readonly spotifyApiBaseUrl = 'https://api.spotify.com/v1';
 
    constructor(
        private eventEmitter: EventEmitter2,
        private readonly prismaService: PrismaService,
    ) {
        this.eventEmitter.on('followArtistSpotify.struct', (struct: SpotifyArtistNameDto) => {
            struct.id = 'string';
        });
    }

    private async getAccessToken(userId: number): Promise<string> {

        const refreshToken = await this.prismaService.services.findFirst({
            where: {
                userId: userId,
                typeService: ServiceType.SPOTIFY,
            },
            select: {
                id: true,
                refreshToken: true,
            },
        });

        const spotifyTokenResponse = await this.refreshAccessToken(refreshToken.refreshToken);

        await this.prismaService.services.update({
            where: {
                id: refreshToken.id,
                typeService: ServiceType.SPOTIFY,
            },
            data: {
                token: spotifyTokenResponse.data.access_token,
            },
        });

        return spotifyTokenResponse.data.access_token;
    }

    private async refreshAccessToken(refreshToken: string): Promise<AxiosResponse<any>> {
        const spotifyTokenEndpoint = 'https://accounts.spotify.com/api/token';
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

        const requestBody = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        };

        const headers = {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        return axios.post(spotifyTokenEndpoint, new URLSearchParams(requestBody), { headers });
    }

    @OnEvent('followArtistSpotify')
    async followArtist(artistId: SpotifyArtistNameDto, randomToken: string) {

        const userId = await this.prismaService.user.findFirst({
            where: {
              randomToken: randomToken,
            },
          });

        if (!userId) {
          throw new Error('User not found, or Spotify services not configured');
        }

        const accessToken = await this.getAccessToken(userId.id);

        //TODO use the refresh token to create access token

        const endPoint = `${this.spotifyApiBaseUrl}/me/following?type=artist&ids=${artistId.id}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        try {
            const response: AxiosResponse = await axios.put(endPoint, {}, { headers });

            if (response.status === 204) {
                console.log('Artist followed');
                return true;
            } else {
                console.log('Artist not followed');
                throw new Error('Artist not followed');
            }
        } catch (error) {
            console.log(error);
            throw new Error('Artist not followed');
        }
    }

}
