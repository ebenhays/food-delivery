import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ISignin, ISignup } from "./dto";
import * as argon from 'argon2'
import { PrismaService } from "../prisma/prisma.service";
import { SYSTEM_CODE, SYSTEM_MESSAGE, UserStatus } from "../utils/constants";
import { ISystemResponse } from "../utils/systemResonse";
import _ from 'lodash';
import { JwtService } from "@nestjs/jwt";
import { customers } from "@prisma/client";



@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService, private jwtService: JwtService) { }
    async signup(userData: ISignup): Promise<ISystemResponse> {
        //create a user
        const hashPwd = await argon.hash(userData.password)
        const checkUser = await this.getUser(userData.email)

        if (checkUser) throw new BadRequestException(SYSTEM_MESSAGE.RECORD_ALREADY_EXIST)
        const user = await this.prisma.customers.create({
            data: {
                email_address: userData.email,
                first_name: userData.firstName,
                last_name: userData.lastName,
                customer_password: hashPwd,
                status: UserStatus.ACTIVE,
                phone: userData.primaryPhone,
                res_address: userData.res_address
            },
            select: {
                customer_id: true,
                email_address: true,
                first_name: true,
                last_name: true,
                status: true,
                phone: true,
                res_address: true
            }
        })
        return {
            message: SYSTEM_MESSAGE.SUCCESSFUL,
            code: SYSTEM_CODE.SUCCESSFUL,
            data: user
        }
    }

    async signin(data: ISignin): Promise<ISystemResponse> {
        const findUser = await this.prisma.customers.findFirst({
            where: {
                email_address: data.email,
                status: UserStatus.ACTIVE
            }
        })

        if (!findUser) return {
            message: SYSTEM_MESSAGE.UNKNOWN_ERROR,
            code: SYSTEM_CODE.UNKNOWN_ERROR,
            data: null,
            error: new ForbiddenException('Access Denied').getResponse()
        }
        const verifyPass = await argon.verify(findUser.customer_password, data.password)
        if (!verifyPass) return {
            message: SYSTEM_MESSAGE.INVALID_CREDENTIALS,
            code: SYSTEM_CODE.INVALID_CREDENTIALS,
            data: null,
            error: new ForbiddenException('Access Denied').getResponse()
        }

        return {
            message: SYSTEM_MESSAGE.LOGIN_SUCCESSFUL,
            code: SYSTEM_CODE.LOGIN_SUCCESSFUL,
            data: {
                first_name: findUser.first_name,
                last_name: findUser.last_name,
                email_address: findUser.email_address,
                access_token: await this.jwtService.signAsync({
                    email: data.email,
                    status: findUser.status
                }, {
                    secret: this.config.get("JWT_SECRET"),
                    expiresIn: '1h' //for testing purpose, usually should be short lived
                })
            }
        }
    }

    private async getUser(email: string): Promise<customers> {
        const findUser = await this.prisma.customers.findFirst({
            where: {
                email_address: email
            }
        })
        return findUser
    }
}