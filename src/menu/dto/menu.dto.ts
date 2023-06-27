import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class IMenu {
    @IsNotEmpty()
    @ApiProperty()
    name: string
    @ApiProperty()
    @IsNotEmpty()
    price: number
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    restaurant_id: number
}