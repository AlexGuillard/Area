import { Injectable, Res } from '@nestjs/common';
import { Request } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DiscordService {
    constructor(
      private prisma: PrismaService,
    ) {}
    async discordLogin(@Res() req: any) {
        const url = 'https://discord.com/api/oauth2/authorize?client_id=1189230397108793416&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fdiscord%2Fcallback&scope=identify'
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
        req.body = response.data;
        console.log('params: ', req.body);
        // const user = await this.prisma.user.findUnique({
        //   where: {
        //     email: token.user.email,
        //   },
        // });
    
        res.redirect('http://localhost:8081/Area');
        // return req.body;
    }
}
