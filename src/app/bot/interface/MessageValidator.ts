import { GreetingMessage } from '../GreetingMessage';
import { Message } from '../../bot_wrapper/Bot';

export interface MessageValidator {
  validateBotMessage(message: Message): Promise<GreetingMessage | null>;
}
