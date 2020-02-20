import { GreetingMessage } from '../GreetingMessage';
import { MessageValidator } from '../interface/MessageValidator';
import { MessageFactory } from '../../factory/MessageFactory';
import { inject } from 'aurelia-dependency-injection';
import winston = require('winston');
import { Message } from '../../bot_wrapper/Bot';
import { IsAdminUseCase } from '../../../domain/util/IsAdminUseCase';
import config from '../../config';

@inject(config.admin.users, MessageFactory, IsAdminUseCase)
export class WhitelistValidator implements MessageValidator {
  public constructor(
    private readonly adminList: string[],
    private readonly factory: MessageFactory,
    private readonly isAdmin: IsAdminUseCase
  ) { }

  public async validateBotMessage(
    message: Message,
  ): Promise<GreetingMessage | null> {

    const greetingMessage = this.factory.make(message);

    if (!greetingMessage) {
      winston.debug('>> Invalid message: ' + greetingMessage);
      return null;
    }

    if (!this.isAdmin.execute(greetingMessage.senderHandler, this.adminList)) {
      winston.debug('>> Non-admin user ' + greetingMessage.senderHandler + ' attempted to add whitelist: ' + greetingMessage.botMessage);
      return null;
    }

    return greetingMessage;
  }
}

