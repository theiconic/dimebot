import { ListenerAttributes } from '../interface/ListenerAttributes';
import { BalanceMessenger } from './BalanceMessenger';
import { DefaultMessageValidator } from '../default/DefaultMessageValidator';
import { inject } from 'aurelia-dependency-injection';

@inject(DefaultMessageValidator, BalanceMessenger)
export class BalanceListenerAttributes implements ListenerAttributes {
  public readonly eventList: string[] = ['direct_message'];
  public readonly regexList: RegExp[] = [new RegExp('\\bbalance\\b', 'i')];

  public constructor(
    public readonly validator: DefaultMessageValidator,
    public readonly messenger: BalanceMessenger,
  ) { }
}
