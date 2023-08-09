import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: false, type: mongoose.Schema.Types.ObjectId})
    id: string;

    @Prop({required: true, type: mongoose.Schema.Types.String})
    name: string;

    @Prop({required: true, type: mongoose.Schema.Types.Number})
    age: number;

    @Prop({required: true, type: mongoose.Schema.Types.String})
    email: string;

    @Prop({required: true, type: mongoose.Schema.Types.String})
    mobile: string;

    @Prop({required: true, type: mongoose.Schema.Types.String})
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);