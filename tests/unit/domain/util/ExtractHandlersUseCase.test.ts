import { ExtractHandlersUseCase } from '../../../../src/domain/util/ExtractHandlersUseCase';

describe('domain/util/ExtractHandlersUseCase', () => {
  test('Returns the list of handlers contained in the string', async () => {
    const expectedHandlers = ['<@U123>', '<@U1234>', '<@U12345>', '<@U123456>'];
    const text = 'Thanks <@U123>, <@U1234>, myself <@U12345> and <@U123456> (I want some coins too haha)'
    const useCase = new ExtractHandlersUseCase();
    const result = await useCase.execute(text);
    expect(result).toStrictEqual(expectedHandlers);
  });

  test('Returns an empty list if no valid handlers are present', async () => {
    const text = 'Some invalid handlers <U123456> <@> @<U123456> <@U123456'
    const useCase = new ExtractHandlersUseCase();
    const result = await useCase.execute(text);
    expect(result).toStrictEqual([]);
  });

  test('Returns anything inside the `<@>` pattern', async () => {
    const text = 'Some weird handlers <@˜!)(@&!ˆ#@*&%$@($#@_*$˜+@()))> <@<U123456 <@U123456>'
    const useCase = new ExtractHandlersUseCase();
    const result = await useCase.execute(text);
    expect(result).toStrictEqual(['<@˜!)(@&!ˆ#@*&%$@($#@_*$˜+@()))>', '<@<U123456 <@U123456>']);
  });

  test('Returns only unique values', async () => {
    const text = 'Something <@123> something else <@123>, <@321> <@567> another <@123> and a different one <@321>'
    const useCase = new ExtractHandlersUseCase();
    const result = await useCase.execute(text);
    expect(result).toStrictEqual(['<@123>', '<@321>', '<@567>']);
  });
});
