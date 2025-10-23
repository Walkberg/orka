export abstract class TokenVerifierService {
  abstract generate(userId: string): Promise<string>;

  abstract verify(token: string): Promise<{ userId: string } | null>;
}
