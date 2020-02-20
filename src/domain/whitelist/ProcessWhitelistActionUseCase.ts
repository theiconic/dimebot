import { autoinject } from 'aurelia-dependency-injection';
import { ExtractChannelActionUseCase } from '../util/ExtractChannelActionUseCase';
import { ChannelAction } from '../data_structure/ChannelAction';
import { FindOrCreateWhitelistUseCase } from './FindOrCreateWhitelistUseCase';
import { RemoveWhitelistUseCase } from './RemoveWhitelistUseCase';
import { RegExpMatch } from '../../common/RegExpMatch';

@autoinject
export class ProcessWhitelistActionUseCase {
  public constructor(
    private readonly findOrCreateWhitelist: FindOrCreateWhitelistUseCase,
    private readonly extractChannelAction: ExtractChannelActionUseCase,
    private readonly removeWhitelist: RemoveWhitelistUseCase,
  ) { }

  public async execute(regExpMatch: RegExpMatch, text: string): Promise<ChannelAction> {
    const channelAction = this.extractChannelAction.execute(regExpMatch, text);

    switch (channelAction.action) {
      case 'add':
        await this.findOrCreateWhitelist.execute(channelAction.id, channelAction.name);
        break;
      case 'remove':
        await this.removeWhitelist.execute(channelAction.id);
        break;
      default:
        break;
    }

    return channelAction;
  }
}
