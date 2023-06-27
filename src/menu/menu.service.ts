import { Injectable } from '@nestjs/common';
import { menus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginate } from 'src/user/dto';
import { IMenu } from './dto';

@Injectable()
export class MenuService {
    constructor(private prisma: PrismaService) { }

    async createMenu(data: IMenu): Promise<menus> {
        const menu = await this.prisma.menus.create({
            data: {
                name: data.name,
                price: data.price,
                restaurant_id: data.restaurant_id
            }
        })

        return menu
    }

    async getMenus(data: IPaginate): Promise<menus[]> {
        const menu = await this.prisma.menus.findMany({
            take: +data.limit,
            skip: +data.offset,
            include: {
                resturants: {
                    select: {
                        restaurant_id: true,
                        name: true
                    },
                }
            }

        })
        return menu
    }
}
