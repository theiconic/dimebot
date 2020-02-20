import { Connection, ConnectionManager, Repository, ConnectionOptions } from 'typeorm';
import * as winston from 'winston';

export class DatabaseProvider {
  private connection?: Connection;
  private manager: ConnectionManager;

  public constructor(manager: ConnectionManager) {
    this.manager = manager;
  }

  public async connect(options: ConnectionOptions): Promise<void | Connection> {
    return this.manager.create(options).connect().then((connection) => {
      this.connection = connection;
      return this.connection;
    });
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      return this.connection.close();
    }

    winston.error('There was an error on the database connection');
  }

  public getRepository(type: any): Repository<any> | undefined {
    if (this.connection) {
      return this.connection.getRepository(type);
    }

    winston.error('There was an error on the database connection');
  }

  public getCustomRepository(repository: any): Repository<any> | undefined {
    if (this.connection) {
      return this.connection.getCustomRepository(repository);
    }

    winston.error('There was an error on the database connection');
  }
}
