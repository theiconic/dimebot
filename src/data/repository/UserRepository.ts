import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Repository } from 'typeorm';
import { User } from '../../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByHandler(handler: string): Promise<User | null> {
    return await this.findOne({ handler }) || null;
  }

  public async findTopUsers(limit: number): Promise<User[]> {
    return await this.createQueryBuilder('user')
      .orderBy('balance', 'DESC')
      .limit(limit)
      .getMany();
  }

  public async findByHandlersAndBalanceMultipleOf(handlers: string[], balanceMultipleOf: number): Promise<User[]> {
    const inHandlers = handlers.map(handler => `'${handler}'`).join();
    return await this.createQueryBuilder('user')
      .where(`balance <> 0`)
      .andWhere(`handler IN (${inHandlers})`)
      .andWhere(`(balance MOD ${balanceMultipleOf}) = 0`)
      .getMany();
  }
}
