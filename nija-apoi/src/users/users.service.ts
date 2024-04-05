import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private users = [
    { id: 0, name: 'harvy', lastname:'ardiza' },
    { id: 1 , name: 'pettes', lastname:'ardiza' }
  ]

  getUser(name?: 'harvy' | 'pettes' ){
    if(name){
      return this.users.filter((user) => user.name === name);
    }

    return this.users
  }

  getUserbyID(id: number){
    const user = this.users.find((user) => user.id === id);

    if(!user){
      throw new Error("user do not exist");
    }

    return user;
  }

  createUser(CreateUserDto: CreateUserDto) { 
    const newUser ={
      ...CreateUserDto,
      id: Date.now()
    };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if(user.id === id){
        return {...user, ...updateUserDto};
      }
      return user
    })

    return this.getUserbyID(id);

  }

  removeUser(id: number) {
    const toBeremoved = this.getUserbyID(id);

    this.users = this.users.filter((user) => user.id !== id)

    return toBeremoved
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
