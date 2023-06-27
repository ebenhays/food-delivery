import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResturantModule } from './resturant/resturant.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    ResturantModule,
    MenuModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
