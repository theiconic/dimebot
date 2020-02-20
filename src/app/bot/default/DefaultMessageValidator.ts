import { autoinject } from 'aurelia-dependency-injection';
import { MessageValidator } from '../interface/MessageValidator';
import { MessageFactory } from '../../factory/MessageFactory';
import { GreetingMessage } from '../GreetingMessage';
import { Message } from '../../bot_wrapper/Bot';

@autoinject
export class DefaultMessageValidator implements MessageValidator {
  public constructor(
    private readonly factory: MessageFactory,
  ) { }

  public async validateBotMessage(
    message: Message,
  ): Promise<GreetingMessage | null> {
    return this.factory.make(message);
  }
}
