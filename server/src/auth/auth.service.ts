import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  async signUp(params: AuthDto) {
    return params;
  }
  async signIn(params: AuthDto) {
    return params;
  }
}
