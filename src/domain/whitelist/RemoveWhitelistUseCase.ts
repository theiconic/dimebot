import { inject } from 'aurelia-dependency-injection';
import { WhitelistRepository } from '../../data/repository/WhitelistRepository';
import { CustomRepository } from '../../data/database/RepositoryResolver';

@inject(CustomRepository.get(WhitelistRepository))
export class RemoveWhitelistUseCase {
  public constructor(
    private readonly whitelistRepository: WhitelistRepository
  ) { }

  public async execute(channelName: string): Promise<void> {
    await this.whitelistRepository.delete(channelName);
  }
}
