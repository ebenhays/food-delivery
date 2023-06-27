import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ISignin, ISignup } from "./dto";

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @HttpCode(200)
    @ApiOkResponse()
    signup(@Body() data: ISignup) {
        return this.authService.signup(data)
    }

    @Post('signin')
    @HttpCode(200)
    @ApiOkResponse()
    @ApiForbiddenResponse()
    signIn(@Body() data: ISignin) {
        return this.authService.signin(data)
    }



}