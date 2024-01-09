import { ForbiddenException, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ReactionGithubDto } from './dto';
import { Octokit } from "octokit";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GithubService {
    constructor(
        private eventEmitter: EventEmitter2,
        private prismaService: PrismaService,
    ) {
    this.eventEmitter.on("CreateIssue.struct", (struct: ReactionGithubDto) => {
        struct.repository = 'string';
        struct.owner = 'string';
        struct.title = 'string';
        struct.body = 'string';
      })
    }

    async findUserToken(token: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                randomToken: token,
            },
        });
        if (!user) {
            throw new ForbiddenException('token not found');
        }
        const service = await this.prismaService.services.findUnique({
            where: {
                UniqueUserService: {
                  userId: user.id,
                  typeService: "GITHUB",
                },
            },
        });
        if (!service) {
            throw new ForbiddenException('service not found');
        }
        return service.token;
    }

    @OnEvent('CreateIssue')
    async createIssue(struct: ReactionGithubDto, token: string) {
        const tokenService = await this.findUserToken(token);
        const octokit = new Octokit({
            auth: tokenService
        })
        await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: struct.owner,
            repo: struct.repository,
            title: struct.title,
            body: struct.body,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    }
}
