import { ListenerAttributes } from '../interface/ListenerAttributes';
import { scoreboardRegexList } from './ScoreboardRegexList';
import { ScoreboardMessenger } from './ScoreboardMessenger';
import { DefaultMessageValidator } from '../default/DefaultMessageValidator';
import { inject } from 'aurelia-dependency-injection';

@inject(scoreboardRegexList, DefaultMessageValidator, ScoreboardMessenger)
export class ScoreboardListenerAttributes implements ListenerAttributes {
  public readonly eventList: string[] = ['direct_mention', 'direct_message', 'mention'];

  public constructor(
    public readonly regexList: RegExp[],
    public readonly validator: DefaultMessageValidator,
    public readonly messenger: ScoreboardMessenger,
  ) { }
}
