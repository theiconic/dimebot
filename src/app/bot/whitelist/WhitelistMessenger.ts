import { autoinject } from 'aurelia-dependency-injection';
import { GreetingMessage } from '../GreetingMessage';
import { Messenger } from '../interface/Messenger';
import { regExpMatch } from './WhitelistRegex';
import { ShowWhitelistUseCase } from '../../../domain/whitelist/ShowWhitelistUseCase';
import { ProcessWhitelistActionUseCase } from '../../../domain/whitelist/ProcessWhitelistActionUseCase';
import { Bot } from '../../bot_wrapper/Bot';

@autoinject()
export class WhitelistMessenger implements Messenger {
  public constructor(
    private readonly showWhitelist: ShowWhitelistUseCase,
    private readonly processWhitelistAction: ProcessWhitelistActionUseCase
  ) { }

  public async replyMessage(message: GreetingMessage, bot: Bot): Promise<void> {
    let reply = '';
    const channelAction = await this.processWhitelistAction.execute(regExpMatch, message.text);

    switch (channelAction.action) {
      case 'add':
        reply = `Added channel ${channelAction.name} to whitelist`;
        break;
      case 'remove':
        reply = `Removed channel ${channelAction.name} from whitelist`;
        break;
      case 'show':
        reply = await this.showWhitelist.execute();
        break;
      default:
        reply = `The following whitelist commands are available:\n\`show whitelist\`, \`add whitelist #channel\`, \`remove whitelist #channel\``;
    }

    bot.reply(message.botMessage, reply);
  }
}
