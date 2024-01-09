import { Module } from '@nestjs/common';
import { GithubService } from './github.service';

@Module({
  providers: [GithubService]
})
export class GithubModule {}
