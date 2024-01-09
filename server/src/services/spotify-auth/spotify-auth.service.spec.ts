import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyAuthService } from './spotify-auth.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('SpotifyAuthService', () => {
  let service: SpotifyAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyAuthService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<SpotifyAuthService>(SpotifyAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
