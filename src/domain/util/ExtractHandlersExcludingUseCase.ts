import { ExtractHandlersUseCase } from './ExtractHandlersUseCase';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject()
export class ExtractHandlersExcludingUseCase {
  public constructor(
    private readonly exctractHandlers: ExtractHandlersUseCase
  ) { }

  /**
  * Extracts unique handlers from the input text
  * excluding the ones passed in the exclusion list.
  * Handler format `<@[^>]+>`.
  */
  public execute(text: string, excluding: (string | undefined)[]): string[] {
    return this.exctractHandlers.execute(text)
      .filter((handler) => {
        return !excluding.includes(handler);
      });
  }
}
