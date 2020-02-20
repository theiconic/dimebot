import { MigrationInterface, QueryRunner } from 'typeorm';

export class whitelist1557109226531 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
            CREATE TABLE whitelist (
                channel varchar(100) NOT NULL,
                name varchar(100) NOT NULL,
                PRIMARY KEY (channel)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
