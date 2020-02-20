import * as path from 'path';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

export const connectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
  entities: [
    path.join(__dirname, '../../entity/*{.ts,.js}'),
  ],
  migrations: [
    path.join(__dirname, '../../../migrations/js/*.js'),
  ],
  subscribers: [
    path.join(__dirname, '../database/subscriber/*{.ts,.js}'),
  ],
  cli: {
    migrationsDir: 'migrations',
  },
} as ConnectionOptions;
