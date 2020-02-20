import { inject } from 'aurelia-dependency-injection';
import { Transaction } from '../../entity/Transaction';
import { CustomRepository } from '../../data/database/RepositoryResolver';
import { TransactionRepository } from '../../data/repository/TransactionRepository';

@inject(CustomRepository.get(TransactionRepository))
export class RegisterTransactionUseCase {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) { }

  public async execute(sender: string, mentioned: string, message: string, amount: number = 1): Promise<Transaction> {
    const transaction = new Transaction(sender, mentioned, amount, message);
    return await this.transactionRepository.save(transaction);
  }
}
