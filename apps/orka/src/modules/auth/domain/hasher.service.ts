export abstract class HasherService {
  abstract hash(value: string): Promise<string>;

  abstract compare(value: string, hashed: string): Promise<boolean>;
}
