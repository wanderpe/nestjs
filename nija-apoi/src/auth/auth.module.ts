import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import {JwtModule } from '@nestjs/jwt'

@Module({
    imports: [JwtModule],
    providers: [DatabaseService, AuthService, UsersService],
    controllers: [AuthController],
})
export class AuthModule {}
