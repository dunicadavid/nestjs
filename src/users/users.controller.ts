import { Get, Query, Post, Body, Put, Param, Res, HttpStatus, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { UsersService  } from './users.service';
import { UserValidationPipe } from 'src/pipes/validation.pipe';
import { AuthGuard } from '../guards/users.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';


@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles('admin')
  create(@Body(new UserValidationPipe()) user: User) {
    this.usersService.create(user);
  }

  @Get('/:id')
  @Roles('admin','user')
  findOne(@Param('id') id: any): any  {
    return this.usersService.findOne(parseInt(id));
  } 

  @Get()
  @Roles('admin','user')
  async findAll(@Query() query: any) {
    return this.usersService.findAll();
  }

}
