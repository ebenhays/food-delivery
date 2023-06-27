import { Module } from '@nestjs/common';
import { ResturantController } from './resturant.controller';
import { ResturantService } from './resturant.service';

@Module({
  controllers: [ResturantController],
  providers: [ResturantService]
})
export class ResturantModule {}
