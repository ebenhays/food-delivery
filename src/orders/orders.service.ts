import { Injectable, NotFoundException } from '@nestjs/common';
import { orders } from '@prisma/client';
import { gen } from 'n-digit-token';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus, SYSTEM_CODE } from 'src/utils/constants';
import { ISystemResponse } from 'src/utils/systemResonse';
import { IOrders } from './dto';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async createOrders(data: IOrders[], loggedInUserId: number): Promise<ISystemResponse> {
        const orders_data = []
        const batchNo = gen(6)
        for (let order of data) {
            orders_data.push({
                customer_id: loggedInUserId,
                order_date: new Date(),
                restaurant_id: order.restaurant_id,
                menu_id: order.menu_id,
                qty: order.qty,
                status: OrderStatus.PENDING,
                comments: order.comments,
                processed_by: order.processedBy,
                batch_no: batchNo
            })
        }
        await this.prisma.orders.createMany({
            data: orders_data
        })

        return {
            message: "Orders created successfully",
            code: SYSTEM_CODE.SUCCESSFUL,
            data: {
                batchNo: batchNo
            }
        }
    }

    async getOrders(batchId: string): Promise<orders[]> {
        const orders = await this.prisma.orders.findMany({
            where: {
                batch_no: batchId
            },
            select: {
                order_id: true,
                order_date: true,
                qty: true,
                comments: true,
                restaurant_id: false,
                menu_id: false,
                status: false,
                delivery_date: true,
                processed_by: true,
                batch_no: true,
                customers: {
                    select: {
                        customer_id: true,
                        first_name: true,
                        last_name: true
                    }
                },
                menus: {
                    select: {
                        name: true,
                        price: true,
                        resturants: {
                            select: {
                                name: true,
                            }
                        },
                    }
                },
                order_statuses: {
                    select: {
                        name: true
                    }
                }
            }

        })

        const formatResponse = orders.map((rec) => {
            return {
                order_id: rec.order_id,
                order_date: rec.order_date,
                order_qty: rec.qty,
                order_batch: rec.batch_no,
                comments: rec.comments,
                processed_by: rec.processed_by,
                deliveryDate: rec.delivery_date,
                customer: rec.customers.first_name + ' ' + rec.customers.last_name,
                orders: {
                    name: rec.menus.name,
                    menuPrice: rec.menus.price,
                    totalPrice: +rec.menus.price * rec.qty,
                    resturant: rec.menus.resturants.name,
                    order_status: rec.order_statuses.name
                }
            }
        })
        return formatResponse as any
    }

    async checkoutOrders(batchId: string): Promise<ISystemResponse> {
        const findOrders = await this.prisma.orders.findMany({
            where: {
                batch_no: batchId
            }
        })
        if (!findOrders) throw new NotFoundException('Batch not found')

        await this.prisma.orders.updateMany({
            where: {
                batch_no: batchId
            },
            data: {
                delivery_date: new Date(),
                status: OrderStatus.READY_FOR_DELIVERY
            }
        })

        return {
            message: 'checkout successful',
            code: SYSTEM_CODE.SUCCESSFUL,
            data: null
        }

    }
}
