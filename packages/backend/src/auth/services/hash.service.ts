import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService {
  private saltRounds = 10;

  hash(password: string): Promise<string> {
    return hash(password, this.saltRounds);
  }

  compare(password: string, candidate: string): Promise<boolean> {
    return compare(password, candidate);
  }
}
