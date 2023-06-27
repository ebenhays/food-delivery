
import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsEmail, IsEnum, IsNotEmpty, IsNumberString } from "class-validator";
import { UserStatus } from "src/utils/constants";

export class IPaginate {
    @ApiProperty()
    @IsNumberString({ no_symbols: true })
    @IsNotEmpty()
    limit: number

    @ApiProperty()
    @IsNumberString({ no_symbols: true })
    @IsNotEmpty()
    offset: number
}

export class IUser {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    firstName: string

    @IsNotEmpty()
    @ApiProperty()
    lastName: string

    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(UserStatus)
    status: UserStatus

    @IsNotEmpty()
    @ApiProperty()
    primaryPhone: string

    @Allow()
    @ApiProperty({ required: false })
    res_address?: string


}