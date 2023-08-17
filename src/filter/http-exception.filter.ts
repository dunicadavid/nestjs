import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx:      HttpArgumentsHost                   = host.switchToHttp();
    const response: Response<any, Record<string, any>>  = ctx.getResponse<Response>();
    const request:  any                                 = ctx.getRequest<Request>();
    const status:   number                              = exception.getStatus();
    const message:  string                              = exception.message;

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url
      });
  }
}