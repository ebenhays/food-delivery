import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { menus } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard';
import { IPaginate } from 'src/user/dto';
import { IMenu } from './dto';
import { MenuService } from './menu.service';

@UseGuards(JwtAuthGuard)
@ApiTags('menus')
@ApiBearerAuth()
@Controller('menus')
export class MenuController {
    constructor(private menuService: MenuService) { }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    @Post()
    createMenu(@Body() data: IMenu): Promise<menus> {
        return this.menuService.createMenu(data)
    }

    @Get()
    @ApiOkResponse()
    getMenus(@Query() data: IPaginate): Promise<menus[]> {
        return this.menuService.getMenus(data)
    }
}
