import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard';
import { IPaginate } from 'src/user/dto';
import { IResturant } from './dto';
import { ResturantService } from './resturant.service';

@UseGuards(JwtAuthGuard)
@ApiTags('resturant')
@Controller('resturant')
export class ResturantController {
    constructor(private resturantService: ResturantService) { }

    @HttpCode(HttpStatus.OK)
    @Post()
    createResturant(@Body() data: IResturant): Promise<IResturant> {
        return this.resturantService.createResturant(data)
    }

    @Get()
    getResturants(@Query() data: IPaginate): Promise<IResturant[]> {
        return this.resturantService.getResturants(data)
    }

    @Get(":id")
    getResturant(@Param("id", ParseIntPipe) resturantId: number): Promise<IResturant> {
        return this.resturantService.getResturant(resturantId)
    }
}
