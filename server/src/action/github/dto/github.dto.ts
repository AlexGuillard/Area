import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GithubIssueDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  owner: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  repository: string;
}

export class IssueDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  numberIssues: number;
}

export class CommitDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numberCommit: string;
}
