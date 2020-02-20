import { GreetingMessage } from '../GreetingMessage';
import { Bot } from '../../bot_wrapper/Bot';

export interface Messenger {
  replyMessage(message: GreetingMessage, bot: Bot): Promise<void>;
}
