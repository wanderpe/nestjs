import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, Role } from '@prisma/client';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService){}
  
  @Post('create')
  createUser(@Body() CreateUserDto: Prisma.UserCreateInput){
    return this.usersService.create(CreateUserDto)
  }

  
  @Get()
  findAll(@Query('role') role?: Role) {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserCreateInput) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  // // GET /users
  // @Get()
  // getusers(@Query('name') name: 'harvy' | 'pettes'){
    
  //   return this.usersService.getUser(name)
  // }



  // // GET /users/id 
  // @Get(':id')
  // getOneUser(@Param('id') id : string){
  //   try{
  //     return this.usersService.getUserbyID(+id)
  //   }catch(err){
  //     throw new NotFoundException();

  //   }
   
  // }

  // @Put('/update/:id')
  // updateUser(@Param('id') id : string, @Body() UpdateUserDto : UpdateUserDto){
  //   return this.usersService.updateUser(+id,UpdateUserDto)

  // }
  
  // @Delete('/delete/:id')
  // removeUser(@Param('id') id : string){
  //   return this.usersService.removeUser(+id)
  // }



















  // constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

}
