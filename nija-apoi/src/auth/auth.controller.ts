import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Get, Post, Request, Response } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}


    @Post("/register")
    register(@Body() CreateUserDto: Prisma.UserCreateInput){
        return this.authService.register(CreateUserDto)
    }


    @Post("/login")
    login(@Body() LoginUser: Prisma.UserCreateInput, @Request() req, @Response() res){
        return this.authService.login(LoginUser, req, res)

    }

    @Get('/signout')
    signout(@Request() req, @Response() res) {
      return this.authService.signout(req, res);
    }
}
