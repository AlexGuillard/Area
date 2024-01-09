import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

describe('DiscordService', () => {
  let service: DiscordService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordService, 
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
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('discordValidate', () => {
    it('should validate Discord user and create a service', async () => {
      // Mock the findUnique function to return a resolved promise
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({
        id: 1,
        email: 'testDiscord@example.com',
      } as any);

      const req = {
        user: {
          email: 'testDiscord@example.com',
          accessToken: 'testAccessToken',
          refreshToken: 'testRefreshToken',
        },
      };

      const res = {
        redirect: jest.fn(),
      };

      await service.discordValidate(req, res);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: req.user.email,
        },
      });

      expect(prismaService.services.create).toHaveBeenCalledWith({
        data: {
          token: req.user.accessToken,
          refreshToken: req.user.refreshToken,
          typeService: 'DISCORD',
          userId: 1, // Assuming the user ID is 1
        },
      });

      expect(res.redirect).toHaveBeenCalledWith(`${process.env.WEB_URL}/Area`);
    });


    it('should throw ForbiddenException if user is not found', async () => {
      const req = {
        user: {
          email: 'nonexistent@example.com', // Corrected email address
          accessToken: 'testAccessToken',
          refreshToken: 'testRefreshToken',
        },
      };
    
      const res = {
        redirect: jest.fn(),
      };
    
      try {
        await service.discordValidate(req, res);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }    
      expect(prismaService.services.create).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(`${process.env.WEB_URL}/Area`);
    });
  });
});
