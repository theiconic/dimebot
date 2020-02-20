import { User } from '../../entity/User';
import { inject } from 'aurelia-dependency-injection';
import { CustomRepository } from '../../data/database/RepositoryResolver';
import { UserRepository } from '../../data/repository/UserRepository';

@inject(CustomRepository.get(UserRepository))
export class FindUsersByListAndBalanceMultipleOfUseCase {
  public constructor(
    private userRepository: UserRepository,
  ) { }

  public async execute(users: User[], balanceMultipleOf: number): Promise<User[]> {
    const handlers = users.map(user => user.handler);
    return await this.userRepository.findByHandlersAndBalanceMultipleOf(handlers, balanceMultipleOf);
  }
}
