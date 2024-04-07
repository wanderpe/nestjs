import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'
import { jwtSecret } from 'src/utils/constants';
import {Request, Response} from 'express'


@Injectable()
export class AuthService {



    constructor(private readonly dbService: DatabaseService, private readonly jwtService: JwtService){}

    async register(createUserDto: Prisma.UserCreateInput) {

        const userExists = await this.dbService.user.findUnique({
            where: {
                email: Prisma.UserScalarFieldEnum.email
            }
        })
        const saltOrRounds = 10;
        const hashpassword = await bcrypt.hash(Prisma.UserScalarFieldEnum.password, saltOrRounds)
        createUserDto.password = hashpassword

        if(userExists) {
            throw new BadRequestException("Email already exists")
        }

        return this.dbService.user.create({
            data: createUserDto
        })
    }


    async login(User : Prisma.UserCreateInput , req: Request, res: Response){
        const {email, password} = User
        
        // password = await bcrypt.hash(password, 10)
        // console.log(password)
        const userExists = await this.dbService.user.findUnique({
            where :{
                email,
                password
            }
        })

        if(!userExists) {
            throw new BadRequestException("wrong credentials")
        }
        
        // const hashpassword = userExists.password
        // console.log(password)
        // console.log(email)
        // console.log(hashpassword)

        // console.log(userExists)
        // //const success = await bcrypt.compare(password, hashpassword)

        // const success = await this.comparePasswords({
        //     password,
        //     hash: userExists.password,
        //   });

        // console.log(success)

        // if(!success){
        //     throw new BadRequestException("wrong password")
        // }
        

        

       

        const token = await this.signToken({id: userExists.id, email: userExists.email})
        
        if(!token){
            throw new ForbiddenException()
        }

        res.cookie('token', token)

        return res.send({message: "Login successful"})

    }


    async signout(req: Request, res: Response) {
        res.clearCookie('token');
    
        return res.send({ message: 'Logged out succefully' });
    }





    // helpers
    async comparePasswords(args: { hash: string; password: string }) {
        return await bcrypt.compare(args.password, args.hash);
    }

    async signToken(args: {id:number, email:string}){
        const payload = args
        return this.jwtService.signAsync(payload, {secret: jwtSecret})
    }
}

