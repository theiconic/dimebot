import { RegExpMatch } from '../../../src/common/RegExpMatch';

describe('common/RegExpMatch', () => {
  test('Returns null when there is no match', async () => {
    const regExpMatch = new RegExpMatch(/<@[^>]+>/gim);
    const result = regExpMatch.match('Something <@U123 here');
    expect(result).toBeNull();
  });

  test('Returns all matched elements', async () => {
    const regExpMatch = new RegExpMatch(/<@[^>]+>/gim);
    const result = regExpMatch.match('Something <@U123> here <@U321>, <@U879>');

    if (result) {
      expect(Array.from(result)).toStrictEqual(['<@U123>', '<@U321>', '<@U879>']);
    }

    expect(result).not.toBeNull();
  });
});
