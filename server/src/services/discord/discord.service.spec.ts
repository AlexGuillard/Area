import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('DiscordService', () => {
  let service: DiscordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscordService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(), // Mock the function here
            },
            services: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('discordValidate', () => {
    it('should validate Discord user and create a service', async () => {
      const req = {
        user: {
          email: 'testDiscord@example.com',
          accessToken: 'testAccessToken',
          refreshToken: 'testRefreshToken',
        },
      };

      const res = {
        redirect: jest.fn(),
        cookie: jest.fn(),
      };

      await service.discordValidate(req, res);

      expect(res.redirect).toHaveBeenCalledWith(
        `${process.env.WEB_URL}/ServicesConnexion`,
      );
    });
  });
});
