import { Injectable, Ip } from '@nestjs/common';
import { AboutDto } from './dto/about.dto';

@Injectable()
export class AboutService {
  getAbout(@Ip() ip): AboutDto {
    const aboutResponse: AboutDto = {
      client: {
        host: ip || 'unknown',
      },
      server: {
        current_time: Date.now(),
        services: [
          {
            name: 'GITHUB',
            actions: [
              {
                name: 'NewIssue',
                description: 'Check if a new issue has been created in a repository',
              },
              {
                name: 'NewCommit',
                description: 'Check if a new commit has been made in a repository',
              },
            ],
            reactions: [
              {
                name: 'CreateIssue',
                description: 'Create an issue in a repository',
              },
            ],
          },
          {
            name: 'GOOGLE',
            actions: [
            ],
            reactions: [
              {
                name: 'sendEmail',
                description:
                  'Send an email with a subject, a to, a template, a from, a code and a randomToken to know wich user is sending the email',
              },
            ],
          },
          {
            name: 'TIME',
            actions: [
              {
                name: 'ExecuteTime',
                description: 'trigger reaction when clock minutes correspond to args',
              },
              {
                name: 'Couldown',
                description: 'trigger reaction every args minutes',
              },
            ],
            reactions: [],
          },
          {
            name: 'WEATHER',
            actions: [
              {
                name: 'Weather',
                description: 'trigger reaction when the temperatures is superior or inferior to the one given in args, need a city',
              },
            ],
            reactions: [],
          },
          {
            name: 'DISCORD',
            actions: [
              {
                name: 'NewMessage',
                description: 'trigger reaction when a new message appear on a channel',
              },
            ],
            reactions: [
              {
                name: 'sendMessageDiscord',
                description: 'send a message on a channel',
              },
              {
                name: 'send message user',
                description: 'send a message to a user',
              },
            ],
          },
          {
            name: 'SPOTIFY',
            actions: [
              {
                name: 'ExecuteSpotify',
                description: 'check if user is playing something or not',
              },
            ],
            reactions: [
              {
                name: 'followArtistSpotify',
                description: 'follow an artist on spotify with his id',
              },
              {
                name: 'unFollowArtistSpotify',
                description: 'unfollow an artist on spotify with his id',
              },
              {
                name: 'likeMusic',
                description: 'like a song on spotify with his id',
              },
              {
                name: 'unLikeMusic',
                description: 'unlike a song on spotify with his id',
              },
            ],
          },
        ],
      },
    };
    return aboutResponse;
  }
}
