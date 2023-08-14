import { Get, Query, Post, Body, Put, Param, Res, HttpStatus, UseGuards, UseInterceptors, UseFilters, UploadedFile, ParseFilePipe, ParseFilePipeBuilder } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { UserDto } from './users.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
@UseGuards(RoleGuard)
@UseInterceptors(LoggingInterceptor)
//@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  @Roles('admin')
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @Get('/:id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: any) {
    return this.usersService.findOne(id);
  }

  @Get()
  @Roles('admin', 'user')
  async findAll(@Query() query: any) {
    return this.usersService.findAll();
  }

  @Post('upload/:id')
  @Roles('admin', 'user')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 150000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.usersService.updateProfileImage(id, file.originalname);
  }
}
