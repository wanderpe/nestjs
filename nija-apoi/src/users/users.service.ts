import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UsersService {

  constructor(private readonly dbService: DatabaseService){}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.dbService.user.create({
      data: createUserDto
    })
  }

  async findAll(role?: Role) {
    if (role) return this.dbService.user.findMany({
      where: {
        role,
      }
    })
    return this.dbService.user.findMany()
  }

  async findOne(id: number) {
    return this.dbService.user.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.dbService.user.update({
      where:{
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return  this.dbService.user.delete({
      where: {
        id,
      }
    });
  }



  // private users = [
  //   { id: 0, name: 'harvy', lastname:'ardiza' },
  //   { id: 1 , name: 'pettes', lastname:'ardiza' }
  // ]

  // getUser(name?: 'harvy' | 'pettes' ){
  //   if(name){
  //     return this.users.filter((user) => user.name === name);
  //   }

  //   return this.users
  // }

  // getUserbyID(id: number){
  //   const user = this.users.find((user) => user.id === id);

  //   if(!user){
  //     throw new Error("user do not exist");
  //   }

  //   return user;
  // }

  // createUser(CreateUserDto: CreateUserDto) { 
  //   const newUser ={
  //     ...CreateUserDto,
  //     id: Date.now()
  //   };
  //   this.users.push(newUser);

  //   return newUser;
  // }

  // updateUser(id: number, updateUserDto: UpdateUserDto) {
  //   this.users = this.users.map((user) => {
  //     if(user.id === id){
  //       return {...user, ...updateUserDto};
  //     }
  //     return user
  //   })

  //   return this.getUserbyID(id);

  // }

  // removeUser(id: number) {
  //   const toBeremoved = this.getUserbyID(id);

  //   this.users = this.users.filter((user) => user.id !== id)

  //   return toBeremoved
  // }
}
