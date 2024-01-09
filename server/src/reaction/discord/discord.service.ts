import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DiscordSendMessageDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class DiscordService {
    constructor(
        private eventEmitter: EventEmitter2,
        private readonly prismaservice: PrismaService,
    ) {
    this.eventEmitter.on("sendMessageDiscord.struct", (struct: DiscordSendMessageDto) => {
        struct.name_server = 'string';
        struct.name_channel = 'string';
        struct.content = 'string';
      })
    }

    @OnEvent('sendMessageDiscord')
    async sendMessage(struct: DiscordSendMessageDto, token: string) {
        void token;
        await axios.get('https://discord.com/api/v10/users/@me/guilds', {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          },
        }).then((res) => {
          res.data.forEach(async element => {
            if (element.name === struct.name_server) {
              await axios.get(`https://discord.com/api/v10/guilds/${element.id}/channels`, {
                headers: {
                  Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                },
              }).then((res) => {
                res.data.forEach(async element => {
                  if (element.name === struct.name_channel) {
                    await axios.post(`https://discord.com/api/v10/channels/${element.id}/messages`, {
                      content: struct.content,
                    }, {
                      headers: {
                        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                      },
                    }).catch((err) => {
                      throw Error(err);
                    });
                  }
                });
              })
              .catch((err) => {
                  throw Error(err);
              });
            }
          });
        }).catch((err) => {
            throw Error(err);
        });
    }
}
