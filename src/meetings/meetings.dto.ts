import { IsInt, IsString, IsDateString, IsArray } from 'class-validator';

export class MeetingDto {
    @IsDateString()
    startDate: Date;

    @IsInt()
    duration: number;

    @IsString()
    status: string;
    
    @IsArray()
    @IsString({ each: true })
    users: string[];
}

export class MeetingUpdateDto extends MeetingDto{
    @IsString()
    _id: string;
}