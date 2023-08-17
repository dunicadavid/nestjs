import { IsInt, IsString, IsEmail, IsMobilePhone, Min, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @ApiProperty()
  name: string;
  
  @IsString()
  @IsOptional()
  @IsIn(['admin', 'moderator', 'user'], { message: 'Invalid role' })
  @ApiProperty({ enum: ['admin', 'moderator', 'user']})
  role: string;

  @IsEmail()
  @ApiProperty()
  email: string;
            
  @IsString()
  @ApiProperty()
  password: string;

  @IsMobilePhone('ro-RO') 
  @ApiProperty()
  mobile: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  age: number;
}

export class CreateUserDto extends UserDto {

}

export class UpdateUserDto extends UserDto{

}