import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenVerifierService } from '../domain/token-verifier.service';

@Injectable()
export class JwtService implements TokenVerifierService {
  private readonly secret = process.env.JWT_SECRET || 'supersecret';
  private readonly expiresIn = '1h';

  async generate(userId: string): Promise<string> {
    return jwt.sign({ userId }, this.secret, { expiresIn: this.expiresIn });
  }

  async verify(token: string): Promise<{ userId: string } | null> {
    try {
      const payload = jwt.verify(token, this.secret) as { userId: string };
      return { userId: payload.userId };
    } catch {
      return null;
    }
  }
}
