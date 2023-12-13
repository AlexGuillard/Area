import { Test, TestingModule } from '@nestjs/testing';
import { AboutService } from './about.service';
import { Response, Request } from 'express';
import { AboutController } from './about.controller';
import { Socket } from 'net';

describe('AboutService', () => {
  let service: AboutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutController],
      providers: [AboutService],
    }).compile();

    service = module.get<AboutService>(AboutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate AboutDto with client host and server information', () => {
    const mockResponse: Partial<Response> = {
      json: jest.fn(),
    };

    const mockRequest: Partial<Request> = {
      connection: {
        remoteAddress: '192.168.1.1',
      } as Socket,
    };

    service.getAbout(mockResponse as Response, mockRequest as Request);

    const expectedAboutDto = {
      client: {
        host: '192.168.1.1',
      },
      server: {
        current_time: expect.any(Number),
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

    expect(mockResponse.json).toHaveBeenCalledWith(expectedAboutDto);
  });
});
