import { RegExpMatch } from '../../common/RegExpMatch';

export class ExtractHandlersUseCase {
  /**
  * Extracts unique handlers from the input text.
  * Handler format `<@[^>]+>`.
  */
  public execute(text: string): string[] {
    const regex = new RegExpMatch(/<@[^>]+>/gim);
    const extractedHandlers = regex.match(text);

    if (!extractedHandlers || extractedHandlers.length === 0) {
      return [];
    }

    // returns unique values
    const set = new Set(extractedHandlers);
    return Array.from(set.values());
  }
}
