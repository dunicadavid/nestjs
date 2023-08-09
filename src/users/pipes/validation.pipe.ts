import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(value: any) {
    const emailRegex: RegExp = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\.([a-zA-Z]{2,5})$/;
    
    if (value.email && !emailRegex.test(value.email)) {
      throw new BadRequestException('Invalid email address');
    }

    if (value.mobile && (value.mobile[0] !== '0' || value.mobile[1] !== '7' || value.mobile.length !== 10)) {
      throw new BadRequestException('Invalid mobile number');
    }

    return value;
  }
}