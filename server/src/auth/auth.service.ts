import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { uid } from 'rand-token';
import { OAuth2Client } from 'google-auth-library';
import { ServiceType } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(private prisma: PrismaService) {
    this.googleClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
  }

  async signUp(params: AuthDto) {
    try {
      const hashpass = await argon.hash(params.password);
      const user = await this.prisma.user.create({
        data: {
          email: params.mail,
          password: hashpass,
          randomToken: uid(16),
        },
        select: {
          id: true,
          email: true,
          randomToken: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      await this.prisma.services.create({
        data: {
          userId: user.id,
          typeService: ServiceType.TIME,
          token: uid(16),
        },
      });
      await this.prisma.services.create({
        data: {
          userId: user.id,
          typeService: ServiceType.GOOGLE,
          token: uid(16),
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Email already taken');
        }
      }
      throw error;
    }
  }
  async signIn(params: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: params.mail,
      },
    });
    if (!user) {
      throw new ForbiddenException('mail not found');
    }
    const matchPass = await argon.verify(user.password, params.password);
    if (!matchPass) {
      throw new ForbiddenException('incorrect password');
    }
    user.randomToken = uid(16);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        randomToken: user.randomToken,
      },
    });
    return {
      id: user.id,
      email: user.email,
      randomToken: user.randomToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async loginService(token: string): Promise<any> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const email = payload?.email;

      if (!email) {
        throw new ForbiddenException('Invalid Google token');
      }

      const existingUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser) {
        const hashpass = await argon.hash(uid(16));
        const newUser = await this.prisma.user.create({
          data: {
            email,
            password: hashpass,
            randomToken: uid(16),
          },
          select: {
            id: true,
            email: true,
            randomToken: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        // Here filled with bad infos caus its another funcitonnality so on another branch
        const service = await this.prisma.services.findUnique({
          where: {
            userId: newUser.id,
            token: newUser.randomToken, // bad token to change
            typeService: ServiceType.GOOGLE,
          },
        });

        console.log(service);

        return {
          user: {
            id: newUser.id,
            email: newUser.email,
            randomToken: newUser.randomToken,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
          },
        };
      }

      const newRandomToken = uid(16);

      await this.prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          randomToken: newRandomToken,
        },
        select: {
          id: true,
          email: true,
          randomToken: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        user: {
          id: existingUser.id,
          email: existingUser.email,
          randomToken: newRandomToken,
          createdAt: existingUser.createdAt,
          updatedAt: existingUser.updatedAt,
        },
      };
    } catch (error) {
      throw new ForbiddenException('Error' + error);
    }
  }
}
