import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MeetingPOSTDocument = HydratedDocument<MeetingPOST>;
export type MeetingGETDocument = HydratedDocument<MeetingGET>;

@Schema()
export class MeetingPOST {

    @Prop({ type: Date, required: true })
    startDate: Date;
  
    @Prop({ type: Number, required: true })
    duration: number;

    @Prop({ type: String, required: false })
    status: string;
    
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], required: true })
    users: mongoose.Types.ObjectId[];
}

@Schema()
export class MeetingGET extends MeetingPOST {

    @Prop({ type: mongoose.Types.ObjectId, required: true })
    _id: mongoose.Types.ObjectId;
}



export const MeetingPOSTSchema = SchemaFactory.createForClass(MeetingPOST);
export const MeetingGETSchema = SchemaFactory.createForClass(MeetingGET);