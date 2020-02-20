import { User } from '../../entity/User';
import { inject } from 'aurelia-dependency-injection';
import { RegisterTransactionUseCase } from '../transaction/RegisterTransactionUseCase';
import { CustomRepository } from '../../data/database/RepositoryResolver';
import { UserRepository } from '../../data/repository/UserRepository';
import { FindOrCreateUserUseCase } from './FindOrCreateUserUseCase';

@inject(CustomRepository.get(UserRepository), FindOrCreateUserUseCase, RegisterTransactionUseCase)
export class IncrementBalanceUseCase {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly findOrCreateUser: FindOrCreateUserUseCase,
    private readonly registerTransaction: RegisterTransactionUseCase,
  ) { }

  public async execute(sender: string, mentioned: string, message: string, amount: number = 1): Promise<User> {
    await this.findOrCreateUser.execute(sender);
    const mentionedUser = await this.incrementBalance(mentioned, amount);
    await this.registerTransaction.execute(sender, mentioned, message, amount);
    return mentionedUser;
  }

  private async incrementBalance(mentioned: string, amount: number): Promise<User> {
    const user = await this.findOrCreateUser.execute(mentioned);
    user.balance += amount;
    await this.userRepository.save(user);
    return user;
  }
}
