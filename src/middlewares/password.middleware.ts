import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const saltRounds:   number = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    next();
  }
}