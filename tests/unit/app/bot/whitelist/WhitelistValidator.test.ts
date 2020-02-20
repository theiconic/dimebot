import { WhitelistValidator } from '../../../../../src/app/bot/whitelist/WhitelistValidator';
import GreetingMessage from '../../../../../tests/mocks/GreetingMessage';
import Message from '../../../../../tests/mocks/Message';

describe('app/bot/whitelist/WhitelistValidator', () => {
  const adminList = ['<@admin>', '<@another_admin>'];

  const factory = {
    make: jest.fn(),
  } as any;

  const isAdmin = {
    execute: jest.fn(),
  } as any;

  beforeEach(() => {
    isAdmin.execute = jest.fn().mockReturnValue(true);
    factory.make = jest.fn().mockReturnValue(GreetingMessage);
  });

  test('Returns GreetingMessage for valid Message and for the sender being an admin', async () => {
    const validator = new WhitelistValidator(adminList, factory, isAdmin);
    const result = await validator.validateBotMessage(Message);

    expect(factory.make)
      .toHaveBeenCalledWith(Message);

    expect(isAdmin.execute)
      .toHaveBeenCalledWith(GreetingMessage.senderHandler, adminList);

    expect(result)
      .toBe(GreetingMessage);
  });

  test('Returns null for invalid Message and even when the sender is an admin', async () => {
    factory.make = jest.fn().mockReturnValue(null);

    const invalid = { 'blah': 'meh' } as any;
    const validator = new WhitelistValidator(adminList, factory, isAdmin);
    const result = await validator.validateBotMessage(invalid);

    expect(factory.make)
      .toHaveBeenCalledWith(invalid);

    expect(isAdmin.execute)
      .not
      .toHaveBeenCalled();

    expect(result)
      .toBeNull();
  });

  test('Returns null for valid Message when the sender is NOT an admin', async () => {
    isAdmin.execute = jest.fn().mockReturnValue(false);

    const validator = new WhitelistValidator(adminList, factory, isAdmin);
    const result = await validator.validateBotMessage(Message);

    expect(factory.make)
      .toHaveBeenCalledWith(Message);

    expect(isAdmin.execute)
      .toHaveBeenCalledWith(GreetingMessage.senderHandler, adminList);

    expect(result)
      .toBeNull();
  });
});
