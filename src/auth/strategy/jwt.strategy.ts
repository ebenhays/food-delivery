import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { customers } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    const userInfo = await this.getUser(payload.email)
    return {
      customerId: userInfo.customer_id,
      userName: userInfo.email_address,
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
      status: userInfo.status,
      fullName: userInfo.first_name + ' ' + userInfo.last_name
    };
  }

  private async getUser(email: string): Promise<customers> {
    const findUser = await this.prisma.customers.findFirst({
      where: {
        email_address: email
      }
    })
    return findUser
  }
}