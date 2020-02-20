import { inject } from 'aurelia-dependency-injection';
import { WhitelistRepository } from '../../data/repository/WhitelistRepository';
import { CustomRepository } from '../../data/database/RepositoryResolver';

@inject(CustomRepository.get(WhitelistRepository))
export class ShowWhitelistUseCase {
  public constructor(
    private readonly whitelistRepository: WhitelistRepository
  ) { }

  public async execute(): Promise<string> {
    const channels = await this.whitelistRepository.find();

    if (channels.length === 0) {
      return 'There are no whitelisted channels.';
    }

    let reply = `The following channels are whitelisted:\n`;

    channels.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }).forEach((channel) => {
      reply += `#${channel.name}\n`;
    });

    return reply;
  }
}
