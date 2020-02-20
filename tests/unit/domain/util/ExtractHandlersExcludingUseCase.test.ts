import { ExtractHandlersExcludingUseCase } from '../../../../src/domain/util/ExtractHandlersExcludingUseCase';

describe('domain/util/ExtractHandlersExcludingUseCase', () => {
  const extractUseCase = {
    execute: jest.fn(() => ['<@U123>', '<@U1234>', '<@U12345>', '<@U123456>']),
  } as any;

  const text = 'Thanks <@U123>, <@U1234>, myself <@U12345> and <@U123456> (I want some coins too haha)'

  test('Returns the list of handlers but the excluding ones', async () => {
    const useCase = new ExtractHandlersExcludingUseCase(extractUseCase);
    const result = await useCase.execute(text, ['<@U12345>', '<@U1234>']);

    expect(result.length).toBe(2);
    expect(result[0]).toBe('<@U123>');
    expect(result[1]).toBe('<@U123456>');
  });

  test('Returns all handlers if there isnt any to exclude', async () => {
    const useCase = new ExtractHandlersExcludingUseCase(extractUseCase);
    const result = await useCase.execute(text, []);

    expect(result.length).toBe(4);
    expect(result[0]).toBe('<@U123>');
    expect(result[1]).toBe('<@U1234>');
    expect(result[2]).toBe('<@U12345>');
    expect(result[3]).toBe('<@U123456>');
  });
});
