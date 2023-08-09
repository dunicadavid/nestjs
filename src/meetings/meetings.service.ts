import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from '../schemas/meeting.schema';
import { MeetingDto } from './meetings.dto';

@Injectable()
export class MeetingsService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>) {}

  async createMeeting(createMeetingDto: MeetingDto): Promise<Meeting> {
    const createdMeeting = new this.meetingModel(createMeetingDto);
    return createdMeeting.save();
  }

  async getAllMeetings(): Promise<Meeting[]> {
    return this.meetingModel.find().select({ '__v': false }).exec();
  }

  async getMeetingsToStart(): Promise<Meeting[]> {
    const currentDate = new Date();
    return this.meetingModel.find({ startDate: { $lte: currentDate }, status: 'scheduled' }).exec();
  }

  @Cron('59 * * * * *') //move to cron.service + vezi gtp
  handleCron(): void {
    this.logger.debug('Called when the current second is 45');
    const meetings = await this.getMeetingsToStart();
      meetings.forEach(async (meeting) => {
        if (meeting.startDate <= new Date()) {
          await this.meetingsService.updateMeetingStatus(meeting._id, 'started');
          this.logger.debug(`Meeting ${meeting._id} started`);
        }
      });
  }
}
