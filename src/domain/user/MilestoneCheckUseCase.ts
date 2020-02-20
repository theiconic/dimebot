import { User } from '../../entity/User';
import { autoinject } from 'aurelia-dependency-injection';
import { FindUsersByListAndBalanceMultipleOfUseCase } from './FindUsersByListAndBalanceMultipleOfUseCase';

@autoinject
export class MilestoneCheckUseCase {
  public constructor(
    private readonly findUsersByListAndBalanceMultipleOf: FindUsersByListAndBalanceMultipleOfUseCase
  ) { }

  public async execute(users: User[], milestone: number): Promise<User[]> {
    return await this.findUsersByListAndBalanceMultipleOf.execute(users, milestone);
  }
}
