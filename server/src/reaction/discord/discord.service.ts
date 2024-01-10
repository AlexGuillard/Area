import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DiscordSendMessageDto, DiscordSendMessageUserDto } from './dto';
import axios from 'axios';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DiscordService {
    constructor(
        private eventEmitter: EventEmitter2,
        private prismaService: PrismaService,
    ) {
    this.eventEmitter.on("sendMessageDiscord.struct", (struct: DiscordSendMessageDto) => {
        struct.name_server = 'string';
        struct.name_channel = 'string';
        struct.content = 'string';
      })
      this.eventEmitter.on("send message user.struct", (struct: DiscordSendMessageUserDto) => {
          struct.id_user = 'string';
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

    async findService(token: string) {
      const userId = await this.prismaService.user.findFirst({
        where: {
          randomToken: token,
        },
      });

      if (!userId) {
        throw new Error('User not found, or discord services not configured');
      }

      const service = await this.prismaService.services.findUnique({
        where: {
          UniqueUserService: {
            userId: userId.id,
            typeService: "DISCORD",
          },
        },
      });
      return service;
    }

    @OnEvent('send message user')
    async sendMessageUser(struct: DiscordSendMessageUserDto, token: string) {
        const service = await this.findService(token);
        const res = await axios.post(`https://discord.com/api/v10/users/@me/channels`, {
          recipient_id: struct.id_user,
        }, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }).catch((err) => {
          throw Error("error before: " + err);
        });
        console.log(res.data);
        await axios.post(`https://discord.com/api/v10/channels/${res.data.id}/messages`, {
          content: struct.content,
        }, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          },
        }).catch((err) => {
          throw Error(err);
        });
    }
}
