import { Injectable, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AboutDto } from './dto/about.dto';

@Injectable()
export class AboutService {
    getAbout(res: Response, req: Request): void {
        const clientHost = req.connection.remoteAddress;
    
        const aboutResponse: AboutDto = {
          client: {
            host: clientHost || 'unknown',
          },
          server: {
            current_time:  Date.now(),
            services: [
              {
                name: 'github',
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
                name: 'google',
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
            ],
          },
        };
    
        res.json(aboutResponse);
    }
}
