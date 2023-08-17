import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from './users.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

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

  findOne(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  findUserCredetials(email: string): Promise<UserDocument> {
    return this.userModel
      .findOne({ email })
      .select({'__v': false, 'mobile': false, 'age': false })
      .exec();
  }

  async getProfileImage(id: string): Promise<string> {
    const user = await this.userModel.findById(id).select('profileImage').exec();
    return user.profileImage;
  }

  async updateProfileImage(id: string, filename: string): Promise<UserDocument> {
    try {
      return this.userModel.findByIdAndUpdate(
        id,
        { profileImage: filename },
        { new: true },
      ).exec();
    } catch (err) {
      throw err;
    }
  }
}
