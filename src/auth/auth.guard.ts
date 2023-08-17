import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: any       = context.switchToHttp().getRequest();
        const token:   string    = this.extractTokenFromHeader(request);

        if (!token) {
          throw new UnauthorizedException();
        }
        try {
          const payload = await this.jwtService.verifyAsync(
            token,
            {
              secret: process.env.SECRET,
            }
          );

          request['user'] = payload;
        } catch {
          throw new UnauthorizedException();
        }
        return true;
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}