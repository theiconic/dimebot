import { ScoreboardMessenger } from '../../../../../src/app/bot/scoreboard/ScoreboardMessenger';
import User from '../../../../../tests/mocks/User';
import Message from '../../../../../tests/mocks/Message';
import { GreetingMessage } from '../../../../../src/app/bot/GreetingMessage';

describe('app/bot/scoreboard/ScoreboardMessenger', () => {
  const findTopUsers = {
    execute: jest.fn().mockResolvedValue([User, User, User]),
  } as any;

  const bot = {
    replyInThread: jest.fn(),
  } as any;

  beforeAll(() => {
    findTopUsers.execute = jest.fn().mockResolvedValue([User, User, User]);
    bot.replyInThread = jest.fn();
  });

  test('Replies in thread with top users with valid score limit', async () => {
    const greetingMessage = new GreetingMessage('channel', 'sender', 'score 9876', 'ts', Message, []);

    const messenger = new ScoreboardMessenger(findTopUsers);
    await messenger.replyMessage(greetingMessage, bot);

    const expectedText = 'Scoreboard:\n\n(1) handler 10 :dime:\n(2) handler 10 :dime:\n(3) handler 10 :dime:\n';

    expect(findTopUsers.execute)
      .toHaveBeenCalledWith(9876);

    expect(bot.replyInThread)
      .toHaveBeenCalledWith(greetingMessage.botMessage, expectedText);
  });

  test('Replies in thread with top users with default score limit when its not provided', async () => {
    const greetingMessage = new GreetingMessage('channel', 'sender', 'score', 'ts', Message, []);

    const messenger = new ScoreboardMessenger(findTopUsers);
    await messenger.replyMessage(greetingMessage, bot);

    const expectedText = 'Scoreboard:\n\n(1) handler 10 :dime:\n(2) handler 10 :dime:\n(3) handler 10 :dime:\n';

    expect(findTopUsers.execute)
      .toHaveBeenCalledWith(10);

    expect(bot.replyInThread)
      .toHaveBeenCalledWith(greetingMessage.botMessage, expectedText);
  });

  test('Replies in thread only with title when no users are found', async () => {
    findTopUsers.execute = jest.fn().mockResolvedValue([]);
    const greetingMessage = new GreetingMessage('channel', 'sender', 'score', 'ts', Message, []);

    const messenger = new ScoreboardMessenger(findTopUsers);
    await messenger.replyMessage(greetingMessage, bot);

    const expectedText = 'Scoreboard:\n\n';

    expect(findTopUsers.execute)
      .toHaveBeenCalledWith(10);

    expect(bot.replyInThread)
      .toHaveBeenCalledWith(greetingMessage.botMessage, expectedText);
  });
});
