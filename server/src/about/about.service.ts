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
              {
                name: 'getCalendarEvents',
                description: 'Get a list of calendar events',
              },
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
        ],
      },
    };
    return aboutResponse;
  }
}
