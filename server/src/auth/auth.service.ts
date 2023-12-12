import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    async signUp(params: AuthDto) {
    }
    async signIn(params: AuthDto) {
    }
}
