import { ApiProperty } from "@nestjs/swagger";

export class GithubDto {
    @ApiProperty({ description: 'GitHub user ID' })
    id: number;
  
    @ApiProperty({ description: 'GitHub display name', required: false })
    displayName?: string;
  
    @ApiProperty({ description: 'GitHub username' })
    username: string;
  
    @ApiProperty({ description: 'GitHub profile URL' })
    profileUrl: string;
  
    @ApiProperty({ description: 'GitHub user photos', type: [String], required: false })
    photos?: string[];
  
    @ApiProperty({ description: 'GitHub provider', default: 'github' })
    provider: string;
  
    @ApiProperty({ description: 'Raw GitHub user data as a JSON string' })
    _raw: string;
  
    @ApiProperty({ description: 'GitHub user data as JSON object' })
    _json: Record<string, any>;
  
    @ApiProperty({ description: 'GitHub access token' })
    accessToken: string;
}