import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginate } from 'src/user/dto';
import { IResturant } from './dto/';

@Injectable()
export class ResturantService {
    constructor(private prisma: PrismaService) { }

    async createResturant(data: IResturant): Promise<IResturant> {
        const resturant = await this.prisma.resturants.create({
            data: {
                name: data.name,
                phoneNo1: data.phoneNo1,
                phoneNo2: data.phoneNo2,
                location: data.location,
                city: data.city,
                email_address: data.email_address,
                creation_date: new Date()
            }
        })
        return resturant
    }

    async getResturants(data: IPaginate): Promise<IResturant[]> {
        return await this.prisma.resturants.findMany({
            take: +data.limit,
            skip: +data.offset,
            include: {
                menus: {
                    select: {
                        menu_id: true,
                        name: true
                    }
                }
            }
        })
    }

    async getResturant(id: number): Promise<IResturant> {
        const resturant = await this.prisma.resturants.findFirst({
            where: {
                restaurant_id: id
            }
        })
        if (!resturant) throw new NotFoundException('No resturant found')
        return resturant
    }
}
