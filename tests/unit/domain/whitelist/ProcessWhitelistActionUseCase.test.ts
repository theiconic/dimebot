import { ProcessWhitelistActionUseCase } from '../../../../src/domain/whitelist/ProcessWhitelistActionUseCase';
import { ChannelAction } from '../../../../src/domain/data_structure/ChannelAction';
import { Whitelist } from '../../../../src/entity/Whitelist';
import { RegExpMatch } from '../../../../src/common/RegExpMatch';

describe('domain/whitelist/ProcessWhitelistActionUseCase', () => {
  const regex = /(add|remove|show|help) whitelist(\s?<#([A-Z0-9]+)\|(.*)>)?/gim;
  const regExpMatch = new RegExpMatch(regex);

  test('Removes the channel from the whitelist when the action is `remove`', async () => {
    const text = 'remove whitelist <#CF9J19ZAN|wishlist-next>';
    const action = new ChannelAction('remove', 'channel', 'name');

    const removeWhitelist = {
      execute: jest.fn(),
    } as any;

    const findOrCreateWhitelist = {
      execute: jest.fn(() => new Whitelist('channel', 'name')),
    } as any;

    const extractChannelAction = {
      execute: jest.fn(() => action),
    } as any;

    const useCase = new ProcessWhitelistActionUseCase(
      findOrCreateWhitelist,
      extractChannelAction,
      removeWhitelist
    );

    const result = await useCase.execute(regExpMatch, text);

    expect(extractChannelAction.execute)
      .toHaveBeenCalledWith(regExpMatch, text);

    expect(removeWhitelist.execute)
      .toHaveBeenCalledWith('channel');

    expect(findOrCreateWhitelist.execute)
      .not
      .toHaveBeenCalledWith('channel', 'name');

    expect(result).toStrictEqual(action);
  });

  test('Adds the channel to the whitelist when the action is `add`', async () => {
    const text = 'add whitelist <#CF9J19ZAN|wishlist-next>';
    const action = new ChannelAction('add', 'channel', 'name');

    const removeWhitelist = {
      execute: jest.fn(),
    } as any;

    const findOrCreateWhitelist = {
      execute: jest.fn(() => new Whitelist('channel', 'name')),
    } as any;

    const extractChannelAction = {
      execute: jest.fn(() => action),
    } as any;

    const useCase = new ProcessWhitelistActionUseCase(
      findOrCreateWhitelist,
      extractChannelAction,
      removeWhitelist
    );

    const result = await useCase.execute(regExpMatch, text);

    expect(extractChannelAction.execute)
      .toHaveBeenCalledWith(regExpMatch, text);

    expect(removeWhitelist.execute)
      .not
      .toHaveBeenCalledWith('channel');

    expect(findOrCreateWhitelist.execute)
      .toHaveBeenCalledWith('channel', 'name');

    expect(result).toStrictEqual(action);
  });
});
