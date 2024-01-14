import { Injectable } from '@nestjs/common';
import { ActionService } from '../action.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OpenweatherDto } from './dto/openweather.dto';
import axios from 'axios';

@Injectable()
export class OpenweatherService {
    constructor(
        private actionService: ActionService,
        private eventEmitter: EventEmitter2,
    ) {
        this.eventEmitter.on("Weather.struct", (struct: OpenweatherDto) => {
            struct.city = "Nantes";
            struct.superior = true;
            struct.temperature = 20;
        })
    }

    @OnEvent('Weather')
    async ActionWeather(struct: OpenweatherDto, actionId: number) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${struct.city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=fr`);
            const  weatherData = response.data;
            
            if (struct.superior && weatherData.main.temp > struct.temperature) {
                console.log("superior");
                this.actionService.executeReaction('Weather', struct);
            } else if (!struct.superior && weatherData.main.temp < struct.temperature) {
                console.log("inferior");
                this.actionService.executeReaction('Weather', struct);
            } else {
                console.log("temperatures does not meet the conditions");
            }

        } catch (error) {
            console.error(error);
        }
    }
}
