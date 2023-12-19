import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenController } from './user-token.controller';

describe('UserTokenController', () => {
  let controller: UserTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTokenController],
    }).compile();

    controller = module.get<UserTokenController>(UserTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
