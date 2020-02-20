import { WhitelistMessenger } from '../../../../../src/app/bot/whitelist/WhitelistMessenger';
import GreetingMessage from '../../../../../tests/mocks/GreetingMessage';
import { ChannelAction } from '../../../../../src/domain/data_structure/ChannelAction';
import { regExpMatch } from '../../../../../src/app/bot/whitelist/WhitelistRegex';

describe('app/bot/whitelist/WhitelistMessenger', () => {
  const showWhitelist = {
    execute: jest.fn(),
  } as any;

  const processWhitelistAction = {
    execute: jest.fn(),
  } as any;

  const bot = {
    reply: jest.fn(),
  } as any;

  beforeEach(() => {
    showWhitelist.execute = jest.fn().mockResolvedValue('bla bla bla list');
    processWhitelistAction.execute = jest.fn();
    bot.reply = jest.fn();
  });

  test('Replies with the list of whitelisted channels when action show is passed in', async () => {
    const action = new ChannelAction('show', 'channel id', '#tech_channel');
    processWhitelistAction.execute = jest.fn().mockResolvedValue(action)

    const messenger = new WhitelistMessenger(showWhitelist, processWhitelistAction);
    await messenger.replyMessage(GreetingMessage, bot);

    const expectedText = 'bla bla bla list';

    expect(showWhitelist.execute)
      .toHaveBeenCalled();

    expect(processWhitelistAction.execute)
      .toHaveBeenCalledWith(regExpMatch, GreetingMessage.text);

    expect(bot.reply)
      .toHaveBeenCalledWith(GreetingMessage.botMessage, expectedText);
  });

  test('Replies with the recently whitelisted channel when action add is passed in', async () => {
    const action = new ChannelAction('add', 'channel id', '#tech_channel');
    processWhitelistAction.execute = jest.fn().mockResolvedValue(action)

    const messenger = new WhitelistMessenger(showWhitelist, processWhitelistAction);
    await messenger.replyMessage(GreetingMessage, bot);

    const expectedText = 'Added channel #tech_channel to whitelist';

    expect(showWhitelist.execute)
      .not
      .toHaveBeenCalled();

    expect(processWhitelistAction.execute)
      .toHaveBeenCalledWith(regExpMatch, GreetingMessage.text);

    expect(bot.reply)
      .toHaveBeenCalledWith(GreetingMessage.botMessage, expectedText);
  });

  test('Replies with the recently removed channel when action remove is passed in', async () => {
    const action = new ChannelAction('remove', 'channel id', '#tech_channel');
    processWhitelistAction.execute = jest.fn().mockResolvedValue(action)

    const messenger = new WhitelistMessenger(showWhitelist, processWhitelistAction);
    await messenger.replyMessage(GreetingMessage, bot);

    const expectedText = 'Removed channel #tech_channel from whitelist';

    expect(showWhitelist.execute)
      .not
      .toHaveBeenCalled();

    expect(processWhitelistAction.execute)
      .toHaveBeenCalledWith(regExpMatch, GreetingMessage.text);

    expect(bot.reply)
      .toHaveBeenCalledWith(GreetingMessage.botMessage, expectedText);
  });

  test('Replies with default help message if the action is invalid', async () => {
    const action = new ChannelAction('something', 'channel id', '#tech_channel');
    processWhitelistAction.execute = jest.fn().mockResolvedValue(action)

    const messenger = new WhitelistMessenger(showWhitelist, processWhitelistAction);
    await messenger.replyMessage(GreetingMessage, bot);

    const expectedText = `The following whitelist commands are available:\n\`show whitelist\`, \`add whitelist #channel\`, \`remove whitelist #channel\``;

    expect(showWhitelist.execute)
      .not
      .toHaveBeenCalled();

    expect(processWhitelistAction.execute)
      .toHaveBeenCalledWith(regExpMatch, GreetingMessage.text);

    expect(bot.reply)
      .toHaveBeenCalledWith(GreetingMessage.botMessage, expectedText);
  });
});
