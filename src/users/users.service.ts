import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserDto } from './users.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(userDto: UserDto): Promise<User> {
    try {
      const createUser = new this.userModel(userDto);
      return createUser.save();
    } catch (err) {
      throw err;
    }
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().select({'__v': false}).lean().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id).lean().exec();
  }
}
