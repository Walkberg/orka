import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { HasherService } from '../domain/hasher.service';

@Injectable()
export class BcryptHasherService implements HasherService {
  private readonly saltRounds = 10;

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
