import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeDto, UserDto } from './dto';

@Injectable()
export class MeService {
  constructor(private prisma: PrismaService) {}

  async getUser(token: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        randomToken: token,
      },
    });
    if (!user) {
      throw new ForbiddenException('token not found');
    }
    return user;
  }

  async getMe(token: string) {
    const user = await this.getUser(token);
    const res = new MeDto();
    res.id = user.id;
    res.mail = user.email;
    return res;
  }
}
