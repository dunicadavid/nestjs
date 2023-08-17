import { Controller, Get, Post, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingDto } from './meetings.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Meetings')
@ApiBearerAuth()
@Controller('meetings')
@UseGuards(AuthGuard, RoleGuard)
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The meeting has been successfully created.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 422, description: 'Unprocessable Entity.'})
  @Roles('admin','user')
  async createMeeting(@Body() createMeetingDto: MeetingDto) {
    return this.meetingsService.createMeeting(createMeetingDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The operation has been successfull.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Roles('admin','user')
  async getAllMeetings() {
    return this.meetingsService.getAllMeetings();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The operation has been successfull.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Roles('admin','user')
  async getMeetingWithUsers(@Param('id') id: string) {
    return this.meetingsService.getMeetingWithUsers(id);
  }
}
