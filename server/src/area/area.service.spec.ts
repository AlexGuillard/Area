import { Test, TestingModule } from '@nestjs/testing';
import { AreaService } from './area.service';
import { AreaModule } from './area.module';
import { MeModule } from '../me/me.module';
import { HttpModule } from '@nestjs/axios';
import { MeService } from '../me/me.service';
import { AboutService } from '../about/about.service';
import { PrismaService } from '../prisma/prisma.service';
import { AreaDto, NewAreaDto } from './dto';
import { NotFoundException } from '@nestjs/common';

describe('AreaService', () => {
  let service: AreaService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaService, MeService, AboutService, 
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(), // Mock the function here
            },
            area: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
            action: {
              findUnique: jest.fn(),
            },
            reaction: {
              findUnique: jest.fn(),
            },
          },
        }],
      imports: [HttpModule, AreaModule, MeModule],
    }).compile();

    service = module.get<AreaService>(AreaService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAreas', () => {
    it('should return an empty array if no areas are found', async () => {
      // Mock the dependencies
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({
        id: 1,
        email: 'testEmail',
        password: 'testPassword',
        randomToken: 'testRandomToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(prismaService.area, 'findMany').mockResolvedValueOnce([]);

      // Call the function
      const result: AreaDto[] = await service.getAreas('testRandomToken');

      // Assertions
      expect(prismaService.area.findMany).toHaveBeenCalledWith({
        where: {
          userId: 1, // Replace with the user ID returned by getUser mock
        },
      });

      // Verify the result
      expect(result).toEqual([]);
    });

    it('should return an array of AreaDto objects when areas are found', async () => {
      // Mock the dependencies
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({
        id: 1,
        email: 'testEmail',
        password: 'testPassword',
        randomToken: 'testRandomToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(prismaService.area, 'findMany').mockResolvedValueOnce([
        {
          id: 1,
          name: 'Area1',
          userId: 1,
          actionId: 1,
          reactionId: 2,
        },
      ]);

      jest.spyOn(prismaService.action, 'findUnique').mockResolvedValueOnce({
        id: 1,
        name: 'Action1',
        parameters: 'testStringParameters',
        serviceId: 1,
        // Add other action properties as needed
      });

      jest.spyOn(prismaService.reaction, 'findUnique').mockResolvedValueOnce({
        id: 2,
        name: 'Reaction1',
        parameters: 'testStringParameters',
        serviceId: 1,
        // Add other reaction properties as needed
      });

      // Call the function
      const result: AreaDto[] = await service.getAreas('testRandomToken');

      // Assertions
      expect(prismaService.area.findMany).toHaveBeenCalledWith({
        where: {
          userId: 1, // Replace with the user ID returned by getUser mock
        },
      });

      // Verify the structure of the result
      expect(result).toEqual([
        {
          id: 1,
          nameArea: 'Area1',
        },
        // Add more expected AreaDto objects based on your test data
      ]);
    });
  });

  describe('getArea', () => {
    it('should return an error because wrong id', async () => {
      // Mock the dependencies
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({
        id: 1,
        email: 'testEmail',
        password: 'testPassword',
        randomToken: 'testRandomToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(prismaService.area, 'findMany').mockResolvedValueOnce([]);

      // Call the function
      try {
        await service.getArea('testRandomToken', "null");
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return an area with full info', async () => {
      // Mock the dependencies
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({
        id: 1,
        email: 'testEmail',
        password: 'testPassword',
        randomToken: 'testRandomToken',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(prismaService.area, 'findMany').mockResolvedValueOnce([
        {
          id: 1,
          name: 'Area1',
          userId: 1,
          actionId: 1,
          reactionId: 2,
        },
        {
          id: 2,
          name: 'Area2',
          userId: 1,
          actionId: 1,
          reactionId: 2,
        },
      ]);

      jest.spyOn(prismaService.area, 'findUnique').mockResolvedValueOnce(
        {
          id: 2,
          name: 'Area2',
          userId: 1,
          actionId: 1,
          reactionId: 2,
        },
      );

      jest.spyOn(prismaService.action, 'findUnique').mockResolvedValueOnce({
        id: 1,
        name: 'Action1',
        parameters: 'testStringParameters',
        serviceId: 1,
        // Add other action properties as needed
      });

      jest.spyOn(prismaService.reaction, 'findUnique').mockResolvedValueOnce({
        id: 2,
        name: 'Reaction1',
        parameters: 'testStringParameters',
        serviceId: 1,
        // Add other reaction properties as needed
      });

      // Call the function
      const result: NewAreaDto = await service.getArea('testRandomToken', "2");

      // Assertions
      expect(prismaService.area.findUnique).toHaveBeenCalledWith({
        where: {
          userId: 1, // Replace with the user ID returned by getUser mock
          id: 2,
        },
      });
      expect(prismaService.action.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(prismaService.reaction.findUnique).toHaveBeenCalledWith({
        where: {
          id: 2,
        },
      });

      // Verify the structure of the result
      expect(result).toEqual(
        {
          nameArea: 'Area2',
          nameAction: 'Action1',
          actionParameter: 'testStringParameters',
          nameReaction: 'Reaction1',
          reactionParameter: 'testStringParameters',
        },
      );
    });
  });
});
