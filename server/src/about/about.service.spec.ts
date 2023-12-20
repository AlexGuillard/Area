import { Test, TestingModule } from '@nestjs/testing';
import { AboutService } from './about.service';
import { Response, Request } from 'express';
import { AboutController } from './about.controller';
import { Socket } from 'net';
import { AboutDto } from './dto';

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

  it('should return about information with the correct host', () => {
    const mockIp = '127.0.0.1';
    const result: AboutDto = service.getAbout(mockIp);
    expect(result.client.host).toEqual(mockIp);
    // Add more assertions based on your expected behavior
  });
});
