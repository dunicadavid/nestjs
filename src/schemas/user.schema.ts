import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true, type: String})
    name: string;

    @Prop({required: true, type: Number})
    age: number;

    @Prop({required: true, type: String})
    email: string;

    @Prop({required: true, type: String})
    mobile: string;

    @Prop({required: true, type: String})
    password: string;

    @Prop({required: false, type: String})
    profileImage: string; 

}

export const UserSchema = SchemaFactory.createForClass(User);