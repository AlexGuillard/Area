import { Test, TestingModule } from '@nestjs/testing';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('GoogleAuthController', () => {
  let controller: GoogleAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleAuthController],
      providers: [GoogleAuthService, PrismaService],
    }).compile();

    controller = module.get<GoogleAuthController>(GoogleAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
