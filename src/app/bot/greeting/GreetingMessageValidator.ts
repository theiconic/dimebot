import { GreetingMessage } from '../GreetingMessage';
import { ExtractHandlersExcludingUseCase } from '../../../domain/util/ExtractHandlersExcludingUseCase';
import { IsWhitelistedUseCase } from '../../../domain/whitelist/IsWhitelistedUseCase';
import { MessageValidator } from '../interface/MessageValidator';
import { MessageFactory } from '../../factory/MessageFactory';
import { autoinject } from 'aurelia-dependency-injection';
import * as winston from 'winston';
import config from '../../config';
import { Message } from '../../bot_wrapper/Bot';

@autoinject
export class GreetingMessageValidator implements MessageValidator {
  public constructor(
    private readonly factory: MessageFactory,
    private readonly isWhitelisted: IsWhitelistedUseCase,
    private readonly extractHandlersExcluding: ExtractHandlersExcludingUseCase
  ) { }

  public async validateBotMessage(
    message: Message,
  ): Promise<GreetingMessage | null> {
    if (message.bot_id) {
      winston.debug(`Bots shouldn't greet users. Bot: ` + message.user);
      return null;
    }

    const greetingMessage = this.factory.make(message);

    if (!greetingMessage) {
      return null;
    }

    const channelWhitelisted = await this.isWhitelisted.execute(greetingMessage.channelId);
    if (!channelWhitelisted) {
      winston.debug(message.channel + ' is not a whitelisted channel!');
      return null;
    }

    const mentionedUsers = this.extractHandlersExcluding.execute(
      greetingMessage.text,
      [greetingMessage.senderHandler, message.user]
    );

    if (mentionedUsers.length === 0) {
      winston.debug(`User was trying to self-award a ${config.currency.name}`);
      return null;
    }

    winston.debug('Handlers regex result:\n' + mentionedUsers);
    greetingMessage.mentionedUsersHandlers = mentionedUsers;
    return greetingMessage;
  }
}
