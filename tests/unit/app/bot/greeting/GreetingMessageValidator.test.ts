import { GreetingMessageValidator } from '../../../../../src/app/bot/greeting/GreetingMessageValidator';
import GreetingMessage from '../../../../../tests/mocks/GreetingMessage';
import Message from '../../../../../tests/mocks/Message';
import User from '../../../../../tests/mocks/User';

describe('app/bot/greeting/GreetingMessageValidator', () => {
  const factory = {
    make: jest.fn(),
  } as any;

  const isWhitelisted = {
    execute: jest.fn(),
  } as any;

  const extractHandlersExcluding = {
    execute: jest.fn(),
  } as any;

  beforeEach(() => {
    isWhitelisted.execute = jest.fn().mockReturnValue(true);
    factory.make = jest.fn().mockReturnValue(GreetingMessage);
    extractHandlersExcluding.execute = jest.fn().mockReturnValue([User]);
  });

  test('Returns GreetingMessage for valid Message and for the sender being an admin', async () => {
    const validator = new GreetingMessageValidator(factory, isWhitelisted, extractHandlersExcluding);
    const result = await validator.validateBotMessage(Message);

    expect(factory.make)
      .toHaveBeenCalledWith(Message);

    expect(isWhitelisted.execute)
      .toHaveBeenCalledWith(GreetingMessage.channelId);

    expect(extractHandlersExcluding.execute)
      .toHaveBeenCalledWith(GreetingMessage.text, [GreetingMessage.senderHandler, Message.user]);

    expect(result)
      .toBe(GreetingMessage);
  });

  test('Returns null for invalid Message', async () => {
    factory.make = jest.fn().mockReturnValue(null);
    const invalid = { 'blah': 'meh' } as any;

    const validator = new GreetingMessageValidator(factory, isWhitelisted, extractHandlersExcluding);
    const result = await validator.validateBotMessage(invalid);

    expect(factory.make)
      .toHaveBeenCalledWith(invalid);

    expect(isWhitelisted.execute)
      .not
      .toHaveBeenCalled();

    expect(extractHandlersExcluding.execute)
      .not
      .toHaveBeenCalled();

    expect(result)
      .toBeNull();
  });

  test('Returns null for a channel that is not whitelisted', async () => {
    isWhitelisted.execute = jest.fn().mockReturnValue(false);

    const validator = new GreetingMessageValidator(factory, isWhitelisted, extractHandlersExcluding);
    const result = await validator.validateBotMessage(Message);

    expect(factory.make)
      .toHaveBeenCalledWith(Message);

    expect(isWhitelisted.execute)
      .toHaveBeenCalledWith(GreetingMessage.channelId);

    expect(extractHandlersExcluding.execute)
      .not
      .toHaveBeenCalled();

    expect(result)
      .toBeNull();
  });

  test('Returns null when no users were mentioned', async () => {
    extractHandlersExcluding.execute = jest.fn().mockReturnValue([]);

    const validator = new GreetingMessageValidator(factory, isWhitelisted, extractHandlersExcluding);
    const result = await validator.validateBotMessage(Message);

    expect(factory.make)
      .toHaveBeenCalledWith(Message);

    expect(isWhitelisted.execute)
      .toHaveBeenCalledWith(GreetingMessage.channelId);

    expect(extractHandlersExcluding.execute)
      .toHaveBeenCalledWith(GreetingMessage.text, [GreetingMessage.senderHandler, Message.user]);

    expect(result)
      .toBeNull();
  });

  test('Returns null for greetings sent by a bot', async () => {
    const botMessage = {
      bot_id: 'bot',
      text: 'text',
      ts: 'ts',
      channel: 'channel',
      user: 'user'
    }
    const validator = new GreetingMessageValidator(factory, isWhitelisted, extractHandlersExcluding);
    const result = await validator.validateBotMessage(botMessage);

    expect(factory.make)
      .not
      .toHaveBeenCalled();

    expect(isWhitelisted.execute)
      .not
      .toHaveBeenCalled();

    expect(extractHandlersExcluding.execute)
      .not
      .toHaveBeenCalled();

    expect(result)
      .toBeNull();
  });
});
