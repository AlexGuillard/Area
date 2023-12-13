import { Test, TestingModule } from '@nestjs/testing';
import { AboutService } from './about.service';

describe('AboutService', () => {
  let service: AboutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutService],
    }).compile();

    service = module.get<AboutService>(AboutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
