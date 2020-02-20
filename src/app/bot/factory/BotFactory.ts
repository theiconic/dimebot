import { Listener } from '../Listener';
import { Bot, BotConfiguration } from '../../bot_wrapper/Bot';
import { inject } from 'aurelia-dependency-injection';
import { ScoreboardListenerAttributes } from '../scoreboard/ScoreboardListenerAttributes';
import { GreetingListenerAttributes } from '../greeting/GreetingListenerAttributes';
import { BalanceListenerAttributes } from '../balance/BalanceListenerAttributes';
import { WhitelistListenerAttributes } from '../whitelist/WhitelistListenerAttributes';
import { BotResolver } from './BotResolver';
import config from '../../config';
import { ListenerResolver } from './ListenerResolver';

@inject(
  BotResolver.get(config.bot.engine),
  ListenerResolver.get(ScoreboardListenerAttributes),
  ListenerResolver.get(GreetingListenerAttributes),
  ListenerResolver.get(BalanceListenerAttributes),
  ListenerResolver.get(WhitelistListenerAttributes),
)
export class BotFactory {
  private readonly listeners: Listener[]

  public constructor(
    private readonly bot: Bot,
    ...listeners: Listener[]
  ) {
    this.listeners = listeners;
  }

  public start(config: BotConfiguration): Bot {
    this.bot.start(config);
    this.listen();
    return this.bot;
  }

  private listen(): void {
    this.listeners.forEach((listener) => {
      listener.listen(this.bot);
    });
  }
}
