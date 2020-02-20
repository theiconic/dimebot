import { Container, resolver } from 'aurelia-dependency-injection';
import { DatabaseProvider } from './DatabaseProvider';

@resolver()
export class CustomRepository {
  private key: any;
  private options: RepositoryOptions;

  constructor(key: any, options?: RepositoryOptions) {
    this.key = key;
    this.options = options || { custom: true };
  }

  public static get(key: any, options?: RepositoryOptions): CustomRepository {
    return new CustomRepository(key, options);
  }

  public get(container: Container): any {
    const database = container.get(DatabaseProvider);

    if (this.options.custom) {
      return database.getCustomRepository(this.key);
    }

    return database.getRepository(this.key);
  }
}

interface RepositoryOptions {
  custom?: boolean;
}
