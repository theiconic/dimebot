import { Listener } from '../../../../src/app/bot/Listener';
import { ListenerAttributes } from '../../../../src/app/bot/interface/ListenerAttributes';
import { MessageValidator } from '../../../../src/app/bot/interface/MessageValidator';
import { Messenger } from '../../../../src/app/bot/interface/Messenger';
import { HearsCallback } from '../../../../src/app/bot_wrapper/Bot';
import GreetingMessage from '../../../../tests/mocks/GreetingMessage';
import Message from '../../../../tests/mocks/Message';

describe('app/bot/Listener', () => {
  const bot = {
    hears(keywords: string | string[] | RegExp | RegExp[], events: string | string[], callback: HearsCallback): void {
      callback(Message);
    }
  } as any;

  test('Does not reply to message if it is invalid', async () => {
    const validator = {
      validateBotMessage: jest.fn().mockResolvedValue(null),
    } as MessageValidator;

    const messenger = {
      replyMessage: jest.fn(),
    } as Messenger;

    const attributes = {
      eventList: ['list'],
      regexList: [],
      validator: validator,
      messenger: messenger,
    } as ListenerAttributes;

    const listener = new Listener(attributes);
    await listener.listen(bot);

    expect(validator.validateBotMessage)
      .toHaveBeenCalledWith(Message);

    expect(messenger.replyMessage)
      .not
      .toHaveBeenCalled();
  });

  test('Replies to message if it is valid', async () => {
    const validator = {
      validateBotMessage: jest.fn().mockResolvedValue(GreetingMessage),
    } as MessageValidator;

    const messenger = {
      replyMessage: jest.fn(),
    } as Messenger;

    const attributes = {
      eventList: ['list'],
      regexList: [],
      validator: validator,
      messenger: messenger,
    } as ListenerAttributes;

    const listener = new Listener(attributes);
    await listener.listen(bot);

    expect(validator.validateBotMessage)
      .toHaveBeenCalledWith(Message);

    expect(messenger.replyMessage)
      .toHaveBeenCalledWith(GreetingMessage, bot);
  });
});
