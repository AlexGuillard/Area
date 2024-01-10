import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../../prisma/prisma.service';
import { ServiceType } from '@prisma/client';

@Injectable()
export class SpotifyService {
    private readonly spotifyApiBaseUrl = 'https://api.spotify.com/v1';

    constructor(private readonly prisma: PrismaService) {}

    async getPlaybackState(userId: number): Promise<any> {
        const userToken = await this.prisma.services.findFirst({
            where: {
                userId: userId,
                typeService: ServiceType.SPOTIFY,
            },
        });


        if (!userToken) {
            throw new ForbiddenException("User doesn't have a Spotify token");
        }

        console.log(userToken);

        try {
            console.log("the baseurl is:", `${this.spotifyApiBaseUrl}/me/player`)
            const response = await axios.get(`${this.spotifyApiBaseUrl}/me/player`, {
                headers: {
                    Authorization: `Bearer ${userToken.token}`,
                },
            });

            const playbackState = response.data;

            console.log("this is the playback", playbackState);

            if (playbackState.is_playing) {
                console.log('User is playing something');
            } else {
                console.log('User is not playing anything');
            }

            return playbackState;
        } catch (error) {
            console.log(error);
        }
    }

}
