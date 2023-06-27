import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsNotEmpty, IsNumber } from "class-validator";

export class IOrders {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    restaurant_id: number
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    menu_id: number
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    qty: number
    @Allow()
    @ApiProperty({ required: false })
    comments?: string
    @IsNotEmpty()
    @ApiProperty()
    processedBy: string



}