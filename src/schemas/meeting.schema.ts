import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type MeetingDocument = HydratedDocument<Meeting>;

@Schema()
export class Meeting {
    @Prop({ type: Date, required: true })
    startDate: Date;
  
    @Prop({ type: Number, required: true })
    duration: number;

    @Prop({ type: String, required: false })
    status: string;
    
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], required: true })
    users: mongoose.Types.ObjectId[];
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);