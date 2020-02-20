import { ExtractHandlersUseCase } from './ExtractHandlersUseCase';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class IsAdminUseCase {
  public constructor(
    private readonly extractHandlers: ExtractHandlersUseCase
  ) { }

  /**
  * Validates whether the handler is an admin.
  * If more than one handler is specified it will run the 
  * admin check for all of them and return true if at least
  * one of them is an admin.
  * Handler format `<@[^>]+>`. Admin List format `[^>]+`.
  */
  public execute(input: string, adminList: string[]): boolean {
    const extractedHandlers = this.extractHandlers.execute(input);
    const admins = adminList.map(user => '<@' + user + '>');
    return extractedHandlers
      .filter(handler => admins.includes(handler))
      .length > 0;
  }
}