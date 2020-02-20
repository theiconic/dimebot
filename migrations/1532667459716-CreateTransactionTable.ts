import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionTable1532667459716 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
          CREATE TABLE transaction (
            id int(11) unsigned NOT NULL AUTO_INCREMENT,
            sender_handler varchar(100) NOT NULL,
            mentioned_handler varchar(100) NOT NULL,
            amount int(11) unsigned NOT NULL,
            message text NOT NULL,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> { }
}
