import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {
  }

  async signUp(params: AuthDto) {
    try {
      const hashpass = await argon.hash(params.password);
      const user = await this.prisma.user.create({
        data: {
          email: params.mail,
          password: hashpass,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        }
      })
      return user;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code == "P2002") {
            throw new ForbiddenException("Email already taken")
          }
        }
        throw error;
    }
  }
  async signIn(params: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: params.mail,
      }
    })
    if (!user) {
      throw new ForbiddenException("mail not found");
    }
    const matchPass = await argon.verify(user.password, params.password)
    if (!matchPass) {
      throw new ForbiddenException("incorrect password");
    }
    return user;
  }
}
