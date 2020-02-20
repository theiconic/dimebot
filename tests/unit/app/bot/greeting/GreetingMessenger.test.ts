import { GreetingMessenger } from '../../../../../src/app/bot/greeting/GreetingMessenger';
import GreetingMessage from '../../../../../tests/mocks/GreetingMessage';
import User from '../../../../../tests/mocks/User';
import { Message } from '../../../../../src/app/bot_wrapper/Bot';

describe('app/bot/greeting/GreetingMessenger', () => {
  const milestone = 10;

  const incrementBalance = {
    execute: jest.fn(),
  } as any;

  const milestoneCheck = {
    execute: jest.fn(),
  } as any;

  const bot = {
    addReaction: jest.fn(),
    replyInThread: jest.fn(),
    say: jest.fn(),
  } as any;

  beforeEach(() => {
    milestoneCheck.execute = jest.fn().mockResolvedValue([]);
    incrementBalance.execute = jest.fn().mockResolvedValue(User);
    bot.replyInThread = jest.fn();
    bot.addReaction = jest.fn();
    bot.say = jest.fn();
  });

  test('Increments receivers balance, post it in a thread and post milestone when its time', async () => {
    milestoneCheck.execute = jest.fn().mockResolvedValue([User]);

    const messenger = new GreetingMessenger(milestone, incrementBalance, milestoneCheck);
    await messenger.replyMessage(GreetingMessage, bot);

    const expectedInThreadReply = 'handler has 10 :dime:';
    const expectedMilestoneSay = ':dime: *Congratulations* to handler for reaching *10 dimes*! Keep up the good work!';
    const expectedSay = {
      text: expectedMilestoneSay,
      channel: 'CA1R5RJ21'
    } as Message;

    expect(incrementBalance.execute)
      .toHaveBeenLastCalledWith('sender', 'mentioned', 'text');

    expect(milestoneCheck.execute)
      .toHaveBeenCalledWith([User], milestone);

    expect(bot.replyInThread)
      .toHaveBeenCalledWith(GreetingMessage.botMessage, expectedInThreadReply);

    expect(bot.addReaction)
      .toHaveBeenCalledWith(GreetingMessage.timestamp, GreetingMessage.channelId, 'dime');

    expect(bot.say)
      .toHaveBeenCalledWith(expectedSay);
  });

  test('Increments receivers balance and post it in a thread', async () => {
    const messenger = new GreetingMessenger(milestone, incrementBalance, milestoneCheck);
    await messenger.replyMessage(GreetingMessage, bot);

    const expectedInThreadReply = 'handler has 10 :dime:';

    expect(incrementBalance.execute)
      .toHaveBeenLastCalledWith('sender', 'mentioned', 'text');

    expect(milestoneCheck.execute)
      .toHaveBeenCalledWith([User], milestone);

    expect(bot.replyInThread)
      .toHaveBeenCalledWith(GreetingMessage.botMessage, expectedInThreadReply);

    expect(bot.addReaction)
      .toHaveBeenCalledWith(GreetingMessage.timestamp, GreetingMessage.channelId, 'dime');

    expect(bot.say)
      .not
      .toHaveBeenCalled();
  });
});
