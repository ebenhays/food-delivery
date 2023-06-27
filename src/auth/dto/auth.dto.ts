import { ApiProperty } from "@nestjs/swagger"
import { Allow, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class ISignup {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @Allow()
    @ApiProperty({ required: false })
    password?: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName: string


    @IsNotEmpty()
    @ApiProperty()
    @ApiProperty()
    primaryPhone?: string

    @Allow()
    @ApiProperty({ required: false })
    res_address?: string

}

export class ISignin {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 3,
        minUppercase: 1,
        minNumbers: 3,
        minSymbols: 1
    })
    @ApiProperty()
    password: string
}

export class IChangePassword {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 3,
        minUppercase: 1,
        minNumbers: 3,
        minSymbols: 1
    })
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 3,
        minUppercase: 1,
        minNumbers: 3,
        minSymbols: 1
    })
    @ApiProperty()
    confirmPassword: string
}
