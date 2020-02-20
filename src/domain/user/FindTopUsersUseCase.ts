import { User } from '../../entity/User';
import { inject } from 'aurelia-dependency-injection';
import { CustomRepository } from '../../data/database/RepositoryResolver';
import { UserRepository } from '../../data/repository/UserRepository';

@inject(CustomRepository.get(UserRepository))
export class FindTopUsersUseCase {
  public constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async execute(limit: number): Promise<User[]> {
    return await this.userRepository.findTopUsers(limit);
  }
}
