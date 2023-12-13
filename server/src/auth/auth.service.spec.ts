import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth.module';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [PrismaModule, AuthModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up with valid email and password', () => {
      const validParams: AuthDto = {
        mail: 'test@example.com',
        password: 'securePassword123',
      };
      return expect(service.signUp(validParams)).resolves.not.toThrow();
    });

    it('should throw an error with missing email', () => {
      const paramsWithoutEmail: AuthDto = plainToClass(AuthDto, {
        mail: '',
        password: 'securePassword123',
      });
      const errors = validateSync(paramsWithoutEmail);
      return expect(errors).toHaveLength(1);
    });

    it('should throw an error with invalid email format', () => {
      const invalidEmailParams: AuthDto =  plainToClass(AuthDto, {
        mail: 'invalidEmail',
        password: 'securePassword123',
      });
      const errors = validateSync(invalidEmailParams);
      return expect(errors).toHaveLength(1);
    });

    it('should throw an error with missing password', () => {
      const paramsWithoutPassword: AuthDto = {
        mail: 'test2@example.com',
        password: '',
      };
      return expect(service.signUp(paramsWithoutPassword)).resolves.toThrowErrorMatchingSnapshot("Email already taken");
    });

    it('should throw an error with a weak password', () => {
      const weakPasswordParams: AuthDto = {
        mail: 'test@example.com',
        password: 'weak',
      };
      return expect(service.signUp(weakPasswordParams)).rejects.toThrow();
    });
  });
});
