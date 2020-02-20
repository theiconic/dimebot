import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Whitelist {
  @PrimaryColumn('varchar', { length: 100, name: 'channel' })
  public readonly channel: string;

  @Column('varchar', { length: 100, nullable: false, name: 'name' })
  public readonly name: string;

  public constructor(channel: string, name: string) {
    this.channel = channel;
    this.name = name;
  }
}
