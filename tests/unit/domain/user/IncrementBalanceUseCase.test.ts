import { IncrementBalanceUseCase } from '../../../../src/domain/user/IncrementBalanceUseCase';
import { User } from '../../../../src/entity/User';

describe('domain/user/IncrementBalanceUseCase', () => {
  const repository = {
    save: jest.fn(),
  } as any;

  const transactionUseCase = {
    execute: jest.fn(),
  } as any;

  const initialUser = new User('receiver', 2);

  const findOrCreateUseCase = {
    execute: jest.fn(() => initialUser),
  } as any;

  test('Updates mentioneds user balance and registers the transaction', async () => {
    const updatedUser = new User('receiver', 3);
    const useCase = new IncrementBalanceUseCase(repository, findOrCreateUseCase, transactionUseCase);
    const result = await useCase.execute('sender', 'receiver', 'message');

    expect(findOrCreateUseCase.execute)
      .toHaveBeenCalledWith('sender');

    expect(findOrCreateUseCase.execute)
      .toHaveBeenCalledWith('receiver');

    expect(repository.save)
      .toHaveBeenCalledWith(updatedUser);

    expect(transactionUseCase.execute)
      .toHaveBeenLastCalledWith('sender', 'receiver', 'message', 1);

    expect(result).toStrictEqual(updatedUser);
  });

  test('Updates mentioneds user balance by the amount passed in and registers the transaction', async () => {
    const updatedUser = new User('receiver', 8);
    const useCase = new IncrementBalanceUseCase(repository, findOrCreateUseCase, transactionUseCase);
    const result = await useCase.execute('sender', 'receiver', 'message', 5);

    expect(findOrCreateUseCase.execute)
      .toHaveBeenCalledWith('sender');

    expect(findOrCreateUseCase.execute)
      .toHaveBeenCalledWith('receiver');

    expect(repository.save)
      .toHaveBeenCalledWith(updatedUser);

    expect(transactionUseCase.execute)
      .toHaveBeenLastCalledWith('sender', 'receiver', 'message', 5);

    expect(result).toStrictEqual(updatedUser);
  });
});
