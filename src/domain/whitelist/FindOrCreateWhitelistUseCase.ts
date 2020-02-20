import { inject } from 'aurelia-dependency-injection';
import { WhitelistRepository } from '../../data/repository/WhitelistRepository';
import { CustomRepository } from '../../data/database/RepositoryResolver';
import { Whitelist } from '../../entity/Whitelist';

@inject(CustomRepository.get(WhitelistRepository))
export class FindOrCreateWhitelistUseCase {
  public constructor(
    private readonly whitelistRepository: WhitelistRepository
  ) { }

  public async execute(id: string, name: string): Promise<Whitelist> {
    let channel = await this.whitelistRepository.findOne(id);

    if (!channel) {
      channel = new Whitelist(id, name);
      await this.whitelistRepository.save(channel);
    }

    return channel;
  }
}
