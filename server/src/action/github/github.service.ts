import { Injectable } from '@nestjs/common';
import { ActionService } from '../action.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CommitDto, GithubIssueDto, IssueDto } from './dto';
import { Octokit } from 'octokit';

@Injectable()
export class GithubService {
    constructor(
        private actionService: ActionService,
        private eventEmitter: EventEmitter2,
    ) {
        this.eventEmitter.on("NewIssue.struct", (struct: GithubIssueDto) => {
            struct.owner = "string";
            struct.repository = "string";
        })
        this.eventEmitter.on("NewCommit.struct", (struct: GithubIssueDto) => {
            struct.owner = "string";
            struct.repository = "string";
        })
    }

    @OnEvent('NewIssue')
    async ActionNewIssue(structInfo: GithubIssueDto, actionId: number) {
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
        if (saveParams === null) {
          saveParams = { numberIssues: res.data.length };
        }
        if (saveParams.numberIssues !== undefined && 
            saveParams.numberIssues < res.data.length) {
            this.actionService.executeReaction('NewIssue', structInfo);
        }
        saveParams.numberIssues = res.data.length;
        await this.actionService.updateAction(actionId, saveParams);
    }

    @OnEvent('NewCommit')
    async ActionNewCommit(structInfo: GithubIssueDto, actionId: number) {
        const action = await this.actionService.getAction(actionId);
        const service = await this.actionService.getServiceActions(actionId);
        let saveParams = action.saveParams as unknown as CommitDto;
        const octokit = new Octokit({
            auth: service.token,
          })
        const res = await octokit.request('GET /repos/{owner}/{repo}/commits', {
          owner: structInfo.owner,
          repo:  structInfo.repository,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        if (saveParams === null) {
          saveParams = { numberCommit: res.data[0].sha };
        }
        if (saveParams.numberCommit !== undefined && 
            saveParams.numberCommit !== res.data[0].sha) {
            this.actionService.executeReaction('NewCommit', structInfo);
        }
        saveParams.numberCommit = res.data[0].sha;
        await this.actionService.updateAction(actionId, saveParams);
    }
}
