import { autoinject } from 'aurelia-dependency-injection';
import { GreetingMessage } from '../GreetingMessage';
import { Messenger } from '../interface/Messenger';
import config from '../../config';
import { Bot } from '../../bot_wrapper/Bot';
import { FindOrCreateUserUseCase } from '../../../domain/user/FindOrCreateUserUseCase';

@autoinject()
export class BalanceMessenger implements Messenger {
  public constructor(private readonly findOrCreateUser: FindOrCreateUserUseCase) { }

  public async replyMessage(message: GreetingMessage, bot: Bot): Promise<void> {
    const user = await this.findOrCreateUser.execute(message.senderHandler);
    const text = config.messages.balance.replace('%count%', user.balance.toString());
    bot.reply(message.botMessage, text);
  }
}
