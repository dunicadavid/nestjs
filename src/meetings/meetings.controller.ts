import { Controller, Get, Post, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingDto } from './meetings.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('meetings')
@UseGuards(AuthGuard)
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

  @Get(':id')
  async getMeetingWithUsers(@Param('id') id: string) {
    return this.meetingsService.getMeetingWithUsers(id);
  }
}
