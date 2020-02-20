import { ListenerAttributes } from '../interface/ListenerAttributes';
import { greetingRegexList } from './GreetingRegexList';
import { GreetingMessenger } from './GreetingMessenger';
import { GreetingMessageValidator } from './GreetingMessageValidator';
import { inject } from 'aurelia-dependency-injection';

@inject(greetingRegexList, GreetingMessageValidator, GreetingMessenger)
export class GreetingListenerAttributes implements ListenerAttributes {
  public readonly eventList: string[] = ['ambient'];

  public constructor(
    public readonly regexList: RegExp[],
    public readonly validator: GreetingMessageValidator,
    public readonly messenger: GreetingMessenger,
  ) { }
}
