
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
   
     constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>){}

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id } });
    }
    
    async create(username: string, password: string): Promise<User> {    
        const user = this.userRepository.create({ username, password: password });
        return this.userRepository.save(user);
    }

      // List all users
      async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
    //   // Update user details
    //   async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    //     const user = await this.findOneById(id);
    
    //     // Update user details (if provided)
    //     if (updateUserDto.username) {
    //       user.username = updateUserDto.username;
    //     }
    //     if (updateUserDto.password) {
    //       user.password = await bcrypt.hash(updateUserDto.password, 10);
    //     }
    
    //     return this.usersRepository.save(user);
    //   }
    
}
