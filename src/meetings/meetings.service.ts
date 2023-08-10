import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeetingGET, MeetingGETDocument, MeetingPOST, MeetingPOSTDocument } from '../schemas/meeting.schema';
import { MeetingDto } from './meetings.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class MeetingsService {

  constructor(
    @InjectModel(MeetingPOST.name) private meetingPOSTModel: Model<MeetingPOSTDocument>,
    @InjectModel(MeetingPOST.name) private meetingGETModel: Model<MeetingGETDocument>
  ) {}

  async createMeeting(createMeetingDto: MeetingDto): Promise<MeetingPOST> {
    const createdMeeting = new this.meetingPOSTModel(createMeetingDto);
    return createdMeeting.save();
  }

  async getAllMeetings(): Promise<MeetingGET[]> {
    return this.meetingGETModel.find().select({ '__v': false }).exec();
  }

  async getMeetingsToStart(): Promise<MeetingGET[]> {
    const currentDate = new Date();
    return this.meetingGETModel.find({ startDate: { $lte: currentDate }, status: 'scheduled' }).exec();
  }

  async updateMeetingStatus(id: string, status: string) {
    return this.meetingGETModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }
}
