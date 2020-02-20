import { ListenerAttributes } from '../interface/ListenerAttributes';
import { inject } from 'aurelia-dependency-injection';
import { WhitelistValidator } from './WhitelistValidator';
import { WhitelistMessenger } from './WhitelistMessenger';
import { regExp } from './WhitelistRegex';

@inject(WhitelistValidator, WhitelistMessenger)
export class WhitelistListenerAttributes implements ListenerAttributes {
  public readonly eventList: string[] = ['direct_message'];
  public readonly regexList: RegExp[] = [regExp];

  public constructor(
    public readonly validator: WhitelistValidator,
    public readonly messenger: WhitelistMessenger,
  ) { }
}
