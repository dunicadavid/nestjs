import { Controller, HttpCode, Post, Body, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({ status: 200, description: 'The operation has been successfull.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
