import { Test, TestingModule } from '@nestjs/testing';
import { OpenweatherService } from './openweather.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ActionModule } from '../action.module';

describe('OpenweatherService', () => {
  let service: OpenweatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenweatherService],
      imports: [EventEmitterModule.forRoot(), ActionModule],
    }).compile();

    service = module.get<OpenweatherService>(OpenweatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
