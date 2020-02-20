import { autoinject } from 'aurelia-dependency-injection';
import { GreetingMessage } from '../GreetingMessage';
import { Messenger } from '../interface/Messenger';
import config from '../../config';
import { Bot } from '../../bot_wrapper/Bot';
import { FindTopUsersUseCase } from '../../../domain/user/FindTopUsersUseCase';

@autoinject()
export class ScoreboardMessenger implements Messenger {
  private readonly defaultScoreLimit = 10;

  public constructor(
    private readonly findTopUsers: FindTopUsersUseCase,
  ) { }

  public async replyMessage(message: GreetingMessage, bot: Bot): Promise<void> {
    const limit = Number(message.text.replace(/^\D+/g, '')) || this.defaultScoreLimit;
    const topUsers = await this.findTopUsers.execute(limit);
    let text = 'Scoreboard:\n\n';

    topUsers.forEach((user, index) => {
      text += `(${index + 1}) ` + config.messages.scoreboard.replace('%user%', user.handler).replace('%count%', user.balance.toString());
    });

    bot.replyInThread(message.botMessage, text);
  }
}
