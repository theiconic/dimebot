import { ListenerAttributes } from './interface/ListenerAttributes';
import * as winston from 'winston';
import { Bot } from '../bot_wrapper/Bot';

export class Listener {
  constructor(private readonly attributes: ListenerAttributes) { }

  public async listen(bot: Bot): Promise<void> {
    bot.hears(
      this.attributes.regexList,
      this.attributes.eventList,
      async (message) => {
        winston.debug('\nListener heard message: ' + message.text + '\n');

        const validatedMessage = await this.attributes.validator.validateBotMessage(
          message,
        );

        if (validatedMessage) {
          this.attributes.messenger.replyMessage(validatedMessage, bot);
        }
      },
    );
  }
}
