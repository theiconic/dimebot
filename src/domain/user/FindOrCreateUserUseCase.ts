import { User } from '../../entity/User';
import { inject } from 'aurelia-dependency-injection';
import { CustomRepository } from '../../data/database/RepositoryResolver';
import { UserRepository } from '../../data/repository/UserRepository';

@inject(CustomRepository.get(UserRepository))
export class FindOrCreateUserUseCase {
  private readonly initialBalance = 0;

  public constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async execute(handler: string): Promise<User> {
    let user = await this.userRepository.findByHandler(handler);

    if (!user) {
      user = new User(handler, this.initialBalance);
      await this.userRepository.save(user);
    }

    return user;
  }
}
