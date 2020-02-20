import { RegExpMatch } from '../../common/RegExpMatch';
import { ChannelAction } from '../data_structure/ChannelAction';

export class ExtractChannelActionUseCase {
  public execute(regExpMatch: RegExpMatch, text: string): ChannelAction {
    const extractedParts = regExpMatch.match(text) || [];

    const action = extractedParts[1];
    const id = extractedParts[3] || '';
    const name = extractedParts[4] || '';

    return new ChannelAction(action, id, name)
  }
}
