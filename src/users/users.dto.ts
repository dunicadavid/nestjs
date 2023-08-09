import { IsInt, IsString, IsEmail, IsMobilePhone, Min } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
            
  @IsString()
  password: string;

  @IsMobilePhone('ro-RO') 
  mobile: string;

  @IsInt()
  @Min(0)
  age: number;
}

export class CreateUserDto extends UserDto {

}

export class UpdateUserDto extends UserDto{

}