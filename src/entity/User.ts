import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 100, name: 'handler' })
  public readonly handler: string;

  @Column('int', { nullable: false, name: 'balance' })
  public balance: number;

  public constructor(handler: string, balance: number) {
    this.handler = handler;
    this.balance = balance;
  }
}
