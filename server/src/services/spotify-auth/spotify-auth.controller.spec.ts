import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyAuthController } from './spotify-auth.controller';
import { SpotifyAuthService } from './spotify-auth.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('SpotifyAuthController', () => {
  let controller: SpotifyAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyAuthController],
      providers: [SpotifyAuthService, PrismaService],
    }).compile();

    controller = module.get<SpotifyAuthController>(SpotifyAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
