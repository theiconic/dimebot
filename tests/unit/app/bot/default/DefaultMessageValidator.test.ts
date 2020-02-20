import { DefaultMessageValidator } from '../../../../../src/app/bot/default/DefaultMessageValidator';
import GreetingMessage from '../../../../../tests/mocks/GreetingMessage';
import Message from '../../../../../tests/mocks/Message';
import { MessageFactory } from '../../../../../src/app/factory/MessageFactory';

describe('app/bot/DefaultMessageValidator', () => {
  test('Does not reply to message if it is invalid', async () => {
    const factory = {
      make: jest.fn().mockReturnValue(GreetingMessage),
    } as MessageFactory;

    const validator = new DefaultMessageValidator(factory);
    const result = await validator.validateBotMessage(Message);

    expect(result).toBe(GreetingMessage);
  });
});
