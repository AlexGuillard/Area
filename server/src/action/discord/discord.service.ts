import { Injectable } from '@nestjs/common';
import { ActionService } from '../action.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DiscordMessagesDto, LastMessageDto } from './dto';
import axios from 'axios';

@Injectable()
export class DiscordService {
    constructor(
        private actionService: ActionService,
        private eventEmitter: EventEmitter2,
    ) {
        this.eventEmitter.on("NewMessage.struct", (struct: DiscordMessagesDto) => {
            struct.name_server = "string";
            struct.name_channel = "string";
        })
    }

    @OnEvent('NewMessage')
    async ActionNewMessage(struct: DiscordMessagesDto, actionId: number) {
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
                    await axios.get(`https://discord.com/api/v10/channels/${element.id}/messages`, {
                      headers: {
                        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                      },
                    }).then(async (res) => {
                        const action = await this.actionService.getAction(actionId);
                        let saveParams = action.saveParams as unknown as LastMessageDto;
                        if (saveParams === null) {
                            saveParams = { last_message_id: res.data[0].id };
                        }
                        if (res.data[0].id !== saveParams.last_message_id) {
                            this.actionService.executeReaction('NewMessage', struct);
                        }
                        saveParams.last_message_id = res.data[0].id;
                        this.actionService.updateAction(actionId, saveParams);
                    })
                    .catch((err) => {
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
        })
        .catch((err) => {
            throw Error(err);
        });
    }
}
