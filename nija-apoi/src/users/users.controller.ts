import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { throwError } from 'rxjs';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService){}
  
  // GET /users
  @Get()
  getusers(@Query('name') name: 'harvy' | 'pettes'){
    
    return this.usersService.getUser(name)
  }



  // GET /users/id 
  @Get(':id')
  getOneUser(@Param('id') id : string){
    try{
      return this.usersService.getUserbyID(+id)
    }catch(err){
      throw new NotFoundException();

    }
   
  }

  @Post('create')
  createUser(@Body() CreateUserDto: CreateUserDto){
    return this.usersService.createUser(CreateUserDto)
  }

  @Put('/update/:id')
  updateUser(@Param('id') id : string, @Body() UpdateUserDto : UpdateUserDto){
    return this.usersService.updateUser(+id,UpdateUserDto)

  }
  
  @Delete('/delete/:id')
  removeUser(@Param('id') id : string){
    return this.usersService.removeUser(+id)
  }



















  // constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
