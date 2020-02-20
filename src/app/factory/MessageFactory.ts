import { GreetingMessage } from '../bot/GreetingMessage';
import { FactoryInterface } from './FactoryInterface';
import { Message } from '../bot_wrapper/Bot';

export class MessageFactory implements FactoryInterface<Message, GreetingMessage | null> {
  public make(message: Message): GreetingMessage | null {

    if (!message.text || !message.ts || !message.channel || !message.user) {
      return null;
    }

    const sender = '<@' + message.user + '>';
    return new GreetingMessage(
      message.channel,
      sender,
      message.text,
      message.ts,
      message,
      []);
  }
}
