import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceType } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';
import { GithubDto } from './dto/github.dto';

@Injectable()
export class GithubAuthService {
  constructor(private readonly prisma: PrismaService) {}

  async handleGithubAuthCallback(user: any): Promise<void> {
    const githubOAuthDto = this.mapToGithubDto(user);

    const userDB = await this.prisma.user.findUnique({
      where: {
        email: githubOAuthDto._json.email,
      },
    });

    if (!userDB) {
      throw new ForbiddenException('Mail not found while creating Github service');
    }

    await this.prisma.services.create({
      data: {
        token: githubOAuthDto.accessToken,
        typeService: ServiceType.GITHUB,
        userId: userDB.id,
      },
    });
  }

  private mapToGithubDto(user: any): GithubDto {
    const githubOAuthDto = new GithubDto();
    githubOAuthDto.id = user.id;
    githubOAuthDto.displayName = user.displayName;
    githubOAuthDto.username = user.username;
    githubOAuthDto.profileUrl = user.profileUrl;
    githubOAuthDto.photos = user.photos;
    githubOAuthDto.provider = user.provider;
    githubOAuthDto._raw = user._raw;
    githubOAuthDto._json = user._json;
    githubOAuthDto.accessToken = user.accessToken;

    return githubOAuthDto;
  }
}
