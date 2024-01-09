import { Injectable } from '@nestjs/common';
import { ActionService } from '../action.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Octokit } from 'octokit';

@Injectable()
export class DiscordService {
    constructor(
        private actionService: ActionService,
        private eventEmitter: EventEmitter2,
    ) {
        this.eventEmitter.on("NewMessage.struct", (struct: GithubIssueDto) => {
            struct.owner = "string";
            struct.repository = "string";
        })
    }

    @OnEvent('NewMessage')
    async ActionNewMessage(structInfo: GithubIssueDto, actionId: number) {
        const action = await this.actionService.getAction(actionId);
        const service = await this.actionService.getServiceActions(actionId);
        let saveParams = action.saveParams as unknown as IssueDto;
        const octokit = new Octokit({
            auth: service.token,
          })
        const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
          owner: structInfo.owner,
          repo:  structInfo.repository,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        if (saveParams.numberIssues !== undefined && 
            saveParams.numberIssues < res.data.length) {
            this.actionService.executeReaction('NewIssue', structInfo);
        }
        saveParams.numberIssues = res.data.length;
        await this.actionService.updateAction(actionId, saveParams);
    }
}
