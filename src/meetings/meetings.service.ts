import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from '../schemas/meeting.schema';
import { MeetingDto } from './meetings.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class MeetingsService {

  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
  ) {}

  async createMeeting(createMeetingDto: MeetingDto): Promise<Meeting> {
    const createdMeeting = new this.meetingModel(createMeetingDto);
    return createdMeeting.save();
  }

  async getMeetingWithUsers(id: string): Promise<Meeting | null> {
    return this.meetingModel.findById(id)
      .populate({path: 'users', select: {'__v': false}})
      .select({ '__v': false })
      .exec();
  }

  async getAllMeetings(): Promise<MeetingDocument[]> {
    return this.meetingModel.find().select({ '__v': false }).exec();
  }

  async getMeetingsToStart(): Promise<MeetingDocument[]> {
    const currentDate = new Date();
    return this.meetingModel.find({ 
        startDate: { $lte: currentDate }, 
        status: 'scheduled',
      }).exec();
  }

  async updateMeetingStatus(id: string, status: string): Promise<MeetingDocument> {
    return this.meetingModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }
}
