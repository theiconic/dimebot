import { FindTopUsersUseCase } from '../../../../src/domain/user/FindTopUsersUseCase';
import { User } from '../../../../src/entity/User';

describe('domain/user/FindTopUsersUseCase', () => {
  test('Finds the top users applying the limit', async () => {
    const users = [
      new User('handler1', 999),
      new User('handler2', 100),
      new User('handler3', 2),
    ]

    const repository = {
      findTopUsers: jest.fn(() => users),
    } as any;

    const useCase = new FindTopUsersUseCase(repository);
    const result = await useCase.execute(10);

    const expectedLimit = 10;

    expect(repository.findTopUsers)
      .toHaveBeenCalledWith(expectedLimit);

    expect(result.length).toBe(3);
    expect(result[0].handler).toBe('handler1');
    expect(result[0].balance).toBe(999);
    expect(result[1].handler).toBe('handler2');
    expect(result[1].balance).toBe(100);
    expect(result[2].handler).toBe('handler3');
    expect(result[2].balance).toBe(2);
  });
});
