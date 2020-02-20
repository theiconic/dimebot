import { FindUsersByListAndBalanceMultipleOfUseCase } from '../../../../src/domain/user/FindUsersByListAndBalanceMultipleOfUseCase';
import { User } from '../../../../src/entity/User';

describe('domain/user/FindUsersByListAndBalanceMultipleOfUseCase', () => {
  test('Finds users matched by handler and balance multiplier', async () => {
    const users = [
      new User('handler1', 2),
      new User('handler2', 999),
      new User('handler3', 100),
    ]

    const repository = {
      findByHandlersAndBalanceMultipleOf: jest.fn(() => users),
    } as any;

    const useCase = new FindUsersByListAndBalanceMultipleOfUseCase(repository);
    const result = await useCase.execute(users, 10);

    const expectedHandlers = ['handler1', 'handler2', 'handler3'];
    const expectedMultiplier = 10;

    expect(repository.findByHandlersAndBalanceMultipleOf)
      .toHaveBeenCalledWith(expectedHandlers, expectedMultiplier);

    expect(result.length).toBe(3);
    expect(result[0].handler).toBe('handler1');
    expect(result[0].balance).toBe(2);
    expect(result[1].handler).toBe('handler2');
    expect(result[1].balance).toBe(999);
    expect(result[2].handler).toBe('handler3');
    expect(result[2].balance).toBe(100);
  });
});
