import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Column('varchar', { length: 100, nullable: false, name: 'sender_handler' })
  public readonly senderHandler: string;

  @Column('varchar', { length: 100, nullable: false, name: 'mentioned_handler' })
  public readonly mentionedHandler: string;

  @Column('int', { nullable: false, name: 'amount' })
  public readonly amount: number;

  @Column('text', { nullable: false })
  public readonly message: string;

  @Column('datetime', { default: 'CURRENT_TIMESTAMP', name: 'created_at' })
  public readonly createdAt!: Date;

  public constructor(
    senderHandler: string,
    mentionedHandler: string,
    amount: number,
    message: string) {

    this.senderHandler = senderHandler;
    this.mentionedHandler = mentionedHandler;
    this.amount = amount;
    this.message = message;
  }
}
