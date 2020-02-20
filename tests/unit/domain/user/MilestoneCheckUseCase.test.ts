import { MilestoneCheckUseCase } from '../../../../src/domain/user/MilestoneCheckUseCase';
import { User } from '../../../../src/entity/User';

describe('domain/user/MilestoneCheckUseCase', () => {
  test('Finds users matched by handler and balance multiplier', async () => {
    const users = [
      new User('handler1', 2),
      new User('handler2', 999),
      new User('handler3', 100),
    ]

    const findUsersUseCase = {
      execute: jest.fn(() => [users[2]]),
    } as any;

    const useCase = new MilestoneCheckUseCase(findUsersUseCase);
    const result = await useCase.execute(users, 10);

    expect(findUsersUseCase.execute)
      .toHaveBeenCalledWith(users, 10);

    expect(result.length).toBe(1);
    expect(result[0].handler).toBe('handler3');
    expect(result[0].balance).toBe(100);
  });
});
