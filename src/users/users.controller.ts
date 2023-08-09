import { Get, Query, Post, Body, Put, Param, Res, HttpStatus, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService  } from './users.service';
import { AuthGuard } from '../guards/users.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { UserDto } from './users.dto';


@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
//@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private usersService: UsersService) {}
          
  @Post()
  @Roles('admin')
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @Get('/:id')
  @Roles('admin','user')
  findOne(@Param('id') id: any) {
    return this.usersService.findOne(id);
  } 

  @Get()
  @Roles('admin','user')
  async findAll(@Query() query: any) {
    return this.usersService.findAll();
  }

}
