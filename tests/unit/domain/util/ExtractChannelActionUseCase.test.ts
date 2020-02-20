import { ExtractChannelActionUseCase } from '../../../../src/domain/util/ExtractChannelActionUseCase';
import { RegExpMatch } from '../../../../src/common/RegExpMatch';

describe('domain/util/ExtractChannelActionUseCase', () => {
  test('Returns the channel action based on the regex and message received', async () => {
    const regex = /(add|remove|show|help) whitelist(\s?<#([A-Z0-9]+)\|(.*)>)?/gim;
    const regExpMatch = new RegExpMatch(regex);

    const useCase = new ExtractChannelActionUseCase();
    const result = await useCase.execute(regExpMatch, 'remove whitelist <#CF9J19ZAN|wishlist-next>');

    expect(result.action).toBe('remove');
    expect(result.id).toBe('CF9J19ZAN');
    expect(result.name).toBe('wishlist-next');
  });
});
