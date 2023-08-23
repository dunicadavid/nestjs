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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 422, description: 'Unprocessable Entity.'})
  @Roles('admin')
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'The operation has been successfull.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Roles('admin', 'user')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The operation has been successfull.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Roles('admin', 'user')
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('/:id/photo')
  @ApiResponse({ status: 201, description: 'The image has been successfully added.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 422, description: 'File is required.'})
  @Roles('admin', 'user')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', filename: (req, file, cb) => {
        const uniqueSuffix:   string  = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext:            string  = extname(file.originalname);
        const filename:       string  = `${uniqueSuffix}${ext}`;
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
  
  @Get('/:id/photo')
  @ApiResponse({ status: 200, description: 'The operation has been successfull.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Roles('admin', 'user')
  async getUserPhoto(@Param('id') id: string, @Res() res: Response) {
    const imageName: string = await this.usersService.getProfileImage(id);
    res.sendFile(imageName, { root: 'uploads' });
  }
}
