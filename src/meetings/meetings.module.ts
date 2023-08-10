import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { MeetingGET, MeetingGETSchema, MeetingPOST, MeetingPOSTSchema } from '../schemas/meeting.schema';
import { CronService } from 'src/providers/cron.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MeetingPOST.name, schema: MeetingPOSTSchema }]),
    MongooseModule.forFeature([{ name: MeetingGET.name, schema: MeetingGETSchema }]),
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService, CronService],
})
export class MeetingsModule {}
