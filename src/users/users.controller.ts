import { Get, Query, Post, Body, Put, Param, HttpStatus, UseGuards, UseInterceptors, UseFilters, UploadedFile, ParseFilePipe, ParseFilePipeBuilder, NotFoundException, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { UserDto } from './users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
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
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id/photo')
  @Roles('admin', 'user')
  async getUserPhoto(@Param('id') id: string, @Res() res: Response) {
    const imageName = await this.usersService.getProfileImage(id);
    res.sendFile(imageName, { root: 'uploads' });
  }


  @Post('/:id/photo')
  @Roles('admin', 'user')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        cb(null, filename);
      },
    })
  }))
  async uploadFile(
    @Param('id') id: string,
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
    return this.usersService.updateProfileImage(id, file.filename);
  }
}
