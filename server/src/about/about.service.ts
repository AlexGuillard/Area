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
                name: 'getRepositories',
                description: 'Get a list of repositories for a user',
              },
            ],
            reactions: [
              {
                name: 'createIssue',
                description: 'Create an issue in a repository',
              },
            ],
          },
          {
            name: 'GOOGLE',
            actions: [
              {
                name: 'getCalendarEvents',
                description: 'Get a list of calendar events',
              },
            ],
            reactions: [
              {
                name: 'createCalendarEvent',
                description: 'Create a calendar event',
              },
            ],
          },
          {
            name: 'TIME',
            actions: [
              {
                name: 'setTimer',
                description: 'trigger reaction at end of timer',
              },
            ],
            reactions: [],
          },
        ],
      },
    };
    return aboutResponse;
  }
}
