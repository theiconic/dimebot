import { Message } from '../bot_wrapper/Bot';

export class GreetingMessage {
  public constructor(
    public readonly channelId: string,
    public readonly senderHandler: string,
    public readonly text: string,
    public readonly timestamp: string,
    public readonly botMessage: Message,
    public mentionedUsersHandlers: string[],
  ) { }
}
