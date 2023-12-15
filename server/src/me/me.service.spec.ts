import { Test, TestingModule } from '@nestjs/testing';
import { MeService } from './me.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('MeService', () => {
  let service: MeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<MeService>(MeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
