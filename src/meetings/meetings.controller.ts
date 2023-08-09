import { Controller, Get, Post, Body } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingDto } from './meetings.dto';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  async createMeeting(@Body() createMeetingDto: MeetingDto) {
    return this.meetingsService.createMeeting(createMeetingDto);
  }

  @Get()
  async getAllMeetings() {
    return this.meetingsService.getAllMeetings();
  }
}
