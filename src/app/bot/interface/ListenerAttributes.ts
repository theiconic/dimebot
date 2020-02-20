import { MessageValidator } from './MessageValidator';
import { Messenger } from './Messenger';

export interface ListenerAttributes {
  eventList: string[];
  regexList: RegExp[];
  validator: MessageValidator;
  messenger: Messenger;
}
