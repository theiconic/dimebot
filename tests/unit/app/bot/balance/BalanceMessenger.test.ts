import { BalanceMessenger } from '../../../../../src/app/bot/balance/BalanceMessenger';
import GreetingMessage from '../../../../../tests/mocks/GreetingMessage';
import User from '../../../../../tests/mocks/User';

describe('app/bot/balance/BalanceMessenger', () => {
  test('Does not reply to message if it is invalid', async () => {
    const findOrCreate = {
      execute: jest.fn().mockResolvedValue(User),
    } as any;

    const bot = {
      reply: jest.fn(),
    } as any;

    const messenger = new BalanceMessenger(findOrCreate);
    await messenger.replyMessage(GreetingMessage, bot);

    const expectedText = 'You have 10 :dime:!';

    expect(findOrCreate.execute)
      .toHaveBeenCalledWith(GreetingMessage.senderHandler);

    expect(bot.reply)
      .toHaveBeenCalledWith(GreetingMessage.botMessage, expectedText);
  });
});
