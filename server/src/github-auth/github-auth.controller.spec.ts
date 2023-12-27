import { Test, TestingModule } from '@nestjs/testing';
import { GithubAuthController } from './github-auth.controller';
import { PrismaService } from '../prisma/prisma.service';

describe('GithubAuthController', () => {
  let controller: GithubAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubAuthController],
      providers: [PrismaService],
    }).compile();

    controller = module.get<GithubAuthController>(GithubAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
