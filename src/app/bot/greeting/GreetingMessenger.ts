import { User } from '../../../entity/User';
import { inject } from 'aurelia-dependency-injection';
import { GreetingMessage } from '../GreetingMessage';
import { Messenger } from '../interface/Messenger';
import config from '../../config';
import { IncrementBalanceUseCase } from '../../../domain/user/IncrementBalanceUseCase';
import { MilestoneCheckUseCase } from '../../../domain/user/MilestoneCheckUseCase';
import { Bot } from '../../bot_wrapper/Bot';

@inject(config.currency.milestone, IncrementBalanceUseCase, MilestoneCheckUseCase)
export class GreetingMessenger implements Messenger {
  public constructor(
    private readonly milestone: number,
    private readonly incrementBalanceUseCase: IncrementBalanceUseCase,
    private readonly milestoneCheckUseCase: MilestoneCheckUseCase,
  ) { }

  public async replyMessage(message: GreetingMessage, bot: Bot): Promise<void> {
    const mentionedUsers = await this.incrementBalance(message, bot)
    this.addReaction(message, bot);
    this.replyMentionedUsersInThread(mentionedUsers, message, bot);
    return this.postMilestoneIfRequired(mentionedUsers, bot);
  }

  private async incrementBalance(message: GreetingMessage, bot: Bot): Promise<User[]> {
    const mentionedUsers: User[] = [];
    for (const mentionedHandler of message.mentionedUsersHandlers) {
      const user = await this.incrementBalanceUseCase.execute(
        message.senderHandler,
        mentionedHandler,
        message.text
      );
      mentionedUsers.push(user);
    }
    return mentionedUsers;
  }

  private addReaction(message: GreetingMessage, bot: Bot): void {
    bot.addReaction(message.timestamp, message.channelId, config.currency.emoji.replace(/:/g, ''));
  }

  private replyMentionedUsersInThread(users: User[], message: GreetingMessage, bot: Bot): void {
    const text = users.map(user => `${user.handler} has ${user.balance} ${config.currency.emoji}`).join('\n');
    bot.replyInThread(message.botMessage, text);
  }

  private async postMilestoneIfRequired(users: User[], bot: Bot): Promise<void> {
    const userMilestones = await this.milestoneCheckUseCase.execute(users, this.milestone);
    if (userMilestones.length === 0) {
      return;
    }
    userMilestones.forEach((user) => {
      bot.say({
        text: config.messages.milestone.replace('%name%', user.handler).replace('%count%', user.balance.toString()),
        channel: config.bot.milestoneChannel
      });
    });
    
  }
}
