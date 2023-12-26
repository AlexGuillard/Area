import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { Request } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceType } from '@prisma/client';

@Injectable()
export class DiscordService {
    constructor(
      private prisma: PrismaService,
    ) {}
    async discordLogin(@Res() req: any) {
        const url = 'https://discord.com/api/oauth2/authorize?client_id=1189230397108793416&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fdiscord%2Fcallback&scope=identify+email'
        req.redirect(url);
    }

    async discordCallback(@Request() req: any, @Res() res: any) {
        if (!req.query.code) throw new Error('NoCodeProvided');
        const { code } = req.query;
        const params = new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.DISCORD_REDIRECT_URI
        });

        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/x-www-form-urlencoded'
        };

        const response = await axios.post(
          'https://discord.com/api/oauth2/token',
          params,
          {
            headers
          }
        );
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `${response.data.token_type} ${response.data.access_token}`
            }
        });
        const user = await this.prisma.user.findUnique({
          where: {
            email: userResponse.data.email,
          },
        });
    
        if (!user) {
          throw new ForbiddenException('mail not found. Please register with the same email as the one you are connected');
        }
    
        await this.prisma.services.create({
          data: {
            token: response.data.access_token,
            refreshToken: response.data.refresh_token,
            typeService: ServiceType.DISCORD,
            userId: user.id,
          },
        });
    
        res.redirect('http://localhost:8081/Area');
    }
}
