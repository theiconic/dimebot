import { Container, resolver } from 'aurelia-dependency-injection';
import { Bot } from '../../bot_wrapper/Bot';

@resolver()
export class BotResolver {
  public constructor(private key: string) { }

  public static get(key: string): BotResolver {
    return new BotResolver(key);
  }

  public get(container: Container): Bot {
    return container.get(this.key);
  }
}
