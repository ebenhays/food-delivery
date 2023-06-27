import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { customers } from '@prisma/client';
import { GetUser } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guard';
import { IPaginate, IUser } from './dto/';
import { UserService } from './user.service';
@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService) { }
    @Get('all')
    @ApiOkResponse()
    getUsers(@Query() query: IPaginate) {
        return this.userService.getUsers(query)
    }

    @Get('user')
    @ApiOkResponse()
    getLoggedInUser(@GetUser() user: customers) {
        return this.userService.getLoggedInUser(user)
    }

    @Patch(':id')
    @ApiOkResponse()
    @ApiNotFoundResponse()
    updateUser(@Param("id", ParseIntPipe) userId: number, @Body() data: IUser) {
        return this.userService.updateUser(data, userId)
    }
}

