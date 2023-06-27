import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guard';
import { IOrders } from './dto';
import { OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) { }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    @Post()
    createOrders(@Body(new ParseArrayPipe({ items: IOrders }))
    data: IOrders[], @GetUser() userInfo: any) {
        return this.orderService.createOrders(data, userInfo.customerId)
    }

    @Get(":id")
    @ApiNotFoundResponse()
    @ApiOkResponse()
    getOrders(@Param("id") batchId: string) {
        return this.orderService.getOrders(batchId)
    }

    @Get(":id/checkout")
    checkoutOrders(@Param("id") batchId: string) {
        return this.orderService.checkoutOrders(batchId)
    }
}
