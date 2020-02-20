import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1523509181595 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      CREATE TABLE user (
        handler varchar(100) NOT NULL,
        balance int(11) unsigned NOT NULL,
        PRIMARY KEY (handler)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> { }
}
