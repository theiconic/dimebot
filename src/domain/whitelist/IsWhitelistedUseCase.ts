import { inject } from 'aurelia-dependency-injection';
import { WhitelistRepository } from '../../data/repository/WhitelistRepository';
import { CustomRepository } from '../../data/database/RepositoryResolver';
import { Whitelist } from '../../entity/Whitelist';

@inject(CustomRepository.get(WhitelistRepository))
export class IsWhitelistedUseCase {
  public constructor(
    private readonly whitelistRepository: WhitelistRepository
  ) { }

  public async execute(id: string): Promise<boolean> {
    let channel = await this.whitelistRepository.findOne(id) as Whitelist;
    return (channel) ? true : false;
  }
}
