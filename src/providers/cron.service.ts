import { Injectable, Logger } from '@nestjs/common';
import { MeetingsService } from '../meetings/meetings.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly meetingsService: MeetingsService) {}

  @Cron('59 * * * * *') 
  async startCronJob(): Promise<void> {
    this.logger.debug('Called when the current second is 59');
    const meetings = await this.meetingsService.getMeetingsToStart();
      meetings.forEach(async (meeting) => {
        if (meeting.startDate <= new Date()) {
          await this.meetingsService.updateMeetingStatus(meeting._id.toString(), 'started');
          this.logger.debug(`Meeting ${meeting._id} started`);
        }
      });
  }
}
