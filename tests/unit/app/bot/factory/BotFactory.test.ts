import { BotFactory } from '../../../../../src/app/bot/factory/BotFactory';

describe('app/bot/factory/BotFactory', () => {
  test('Starts the bot and listens to the injected Listeners', async () => {
    const config = {
      accessToken: 'token',
      signingSecret: 'secret'
    } as any;

    const bot = {
      start: jest.fn(),
    } as any

    const listener1 = {
      listen: jest.fn(),
    } as any;

    const listener2 = {
      listen: jest.fn(),
    } as any;

    const factory = new BotFactory(bot, listener1, listener2);
    factory.start(config);

    expect(bot.start)
      .toHaveBeenCalledWith(config);

    expect(listener1.listen)
      .toBeCalledWith(bot);

    expect(listener2.listen)
      .toBeCalledWith(bot);
  });
});
