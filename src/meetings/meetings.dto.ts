import { IsInt, IsString, IsDateString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MeetingDto {
    @IsDateString()
    @ApiProperty()
    startDate: Date;

    @IsInt()
    @ApiProperty()
    duration: number;

    @IsString()
    @ApiProperty()
    status: string;
    
    @IsArray()
    @IsString({ each: true })
    @ApiProperty()
    users: string[];
}
