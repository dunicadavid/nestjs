import { Controller, Get, Post, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingDto } from './meetings.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('meetings')
@UseGuards(AuthGuard, RoleGuard)
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  @Roles('admin','user')
  async createMeeting(@Body() createMeetingDto: MeetingDto) {
    return this.meetingsService.createMeeting(createMeetingDto);
  }

  @Get()
  @Roles('admin','user')
  async getAllMeetings() {
    return this.meetingsService.getAllMeetings();
  }

  @Get(':id')
  @Roles('admin','user')
  async getMeetingWithUsers(@Param('id') id: string) {
    return this.meetingsService.getMeetingWithUsers(id);
  }
}
