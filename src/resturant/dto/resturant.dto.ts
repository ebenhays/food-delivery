import { ApiProperty } from "@nestjs/swagger"
import { Allow, IsNotEmpty } from "class-validator"

export class IResturant {
    @IsNotEmpty()
    @ApiProperty()
    name: string
    @IsNotEmpty()
    @ApiProperty()
    phoneNo1: string
    @Allow()
    @ApiProperty({ required: false })
    phoneNo2?: string
    @IsNotEmpty()
    @ApiProperty()
    location: string
    @IsNotEmpty()
    @ApiProperty()
    city: string
    @IsNotEmpty()
    @ApiProperty()
    email_address: string
}