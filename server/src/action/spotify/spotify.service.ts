import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../../prisma/prisma.service';
import { ServiceType } from '@prisma/client';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ActionService } from '../action.service';
import { SpotifyPlaybackStateDto } from './dto/spotify.dto';

@Injectable()
export class SpotifyService {
    private readonly spotifyApiBaseUrl = 'https://api.spotify.com/v1';

    constructor(
        private readonly prisma: PrismaService,
        private eventEmitter: EventEmitter2,
        private actionService: ActionService,
    ) {
        this.eventEmitter.on('ExecuteSpotify.struct', (struct: SpotifyPlaybackStateDto) => {
            struct.is_playing = false;
        });
    }

    @OnEvent('ExecuteSpotify')
    async getPlaybackState(structInfo: SpotifyPlaybackStateDto, actionId: number): Promise<any> {

        const serviceId = await this.actionService.getServiceActions(actionId);

        const userToken = await this.prisma.services.findFirst({
            where: {
                id: (await serviceId).id,
                typeService: ServiceType.SPOTIFY,
            },
        });

        if (!userToken) {
            throw new ForbiddenException("User doesn't have a Spotify token");
        }

        try {
            const response = await axios.get(`${this.spotifyApiBaseUrl}/me/player`, {
                headers: {
                    Authorization: `Bearer ${userToken.token}`,
                },
            });

            const playbackState = response.data;

            if (playbackState.is_playing && structInfo.is_playing) {
                console.log('User is playing something and want to execute something');
                this.actionService.executeReaction('ExecuteSpotify', structInfo);
            } else if (playbackState.is_playing && !structInfo.is_playing) {
                console.log('User is not playing anything and want to execute something');
                this.actionService.executeReaction('ExecuteSpotify', structInfo);
            }

            return playbackState;
        } catch (error) {
            console.log(error);
        }
    }

}
