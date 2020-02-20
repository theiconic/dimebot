import Botkit = require('botkit');

export type HearsCallback = (message: Message) => void;

export interface Message extends Botkit.SlackMessage {
  bot_id?: string,
}

export interface BotConfiguration {
  accessToken?: string
  signingSecret?: string
}

export interface Bot {
  start(config: BotConfiguration): void
  hears(keywords: string | string[] | RegExp | RegExp[], events: string | string[], callback: HearsCallback): void;
  reply(src: Message, resp: string | Message): Promise<any>;
  say(message: string | Message): Promise<any>;
  replyInThread(src: Message, resp: string | Message): Promise<any>;
  addReaction(timestamp: string, channel: string, reactionName: string): Promise<any>;
}
