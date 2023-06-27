import { Injectable, NotFoundException } from '@nestjs/common';
import { customers } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SYSTEM_CODE, SYSTEM_MESSAGE } from 'src/utils/constants';
import { ISystemResponse } from 'src/utils/systemResonse';
import { IUser } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUsers({ limit, offset }): Promise<ISystemResponse> {
        const result = await this.prisma.customers.findMany({
            select: {
                customer_id: true,
                first_name: true,
                last_name: true,
                email_address: true,
                phone: true,
                res_address: true
            },
            take: +limit,
            skip: +offset,

            orderBy: {
                first_name: 'asc'
            }
        })
        return {
            message: SYSTEM_MESSAGE.SUCCESSFUL,
            code: SYSTEM_CODE.SUCCESSFUL,
            data: result
        }
    }

    getLoggedInUser(data: customers): customers {
        return data
    }

    async updateUser(data: IUser, userId: number): Promise<ISystemResponse> {
        const findUser = await this.prisma.customers.findFirst({
            where: {
                customer_id: userId
            }
        })
        if (!findUser) throw new NotFoundException('Cannot update this user')

        const updateUser = await this.prisma.customers.update({
            where: {
                customer_id: userId
            },
            data: {
                email_address: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                status: data.status,
                phone: data.primaryPhone,
                res_address: data.res_address
            },
            select: {
                first_name: true,
                last_name: true,
                email_address: true,
                status: true,
                phone: true,
            }
        })

        return {
            message: SYSTEM_MESSAGE.SUCCESSFUL,
            code: SYSTEM_CODE.SUCCESSFUL,
            data: updateUser
        }
    }
}
