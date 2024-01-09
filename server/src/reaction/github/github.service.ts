import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ReactionGithubDto } from './dto';
import axios from 'axios';

@Injectable()
export class GithubService {
    constructor(
        private eventEmitter: EventEmitter2,
    ) {
    this.eventEmitter.on("sendMessageDiscord.struct", (struct: ReactionGithubDto) => {
        struct.repository = 'string';
        struct.owner = 'string';
        struct.title = 'string';
        struct.body = 'string';
      })
    }

    @OnEvent('CreateIssue')
    async createIssue(struct: ReactionGithubDto, token: string) {
        void token;
        console.log('CreateIssue', struct);
        await axios.post(`https://api.github.com/repos/${struct.owner}/${struct.repository}/issues`, {
            title: struct.title,
            body: struct.body,
        }, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
                Authorization: `token ${token}`,
            },
        });
    }
}
