import { RegisterTransactionUseCase } from '../../../../src/domain/transaction/RegisterTransactionUseCase';
import { Transaction } from '../../../../src/entity/Transaction';

describe('domain/transaction/RegisterTransactionUseCase', () => {
  test('Transaction is saved in the database', async () => {
    const expectedTransaction = new Transaction('sender', 'mentioned', 5, 'message');
    const repository = {
      save: jest.fn(() => expectedTransaction),
    } as any;

    const useCase = new RegisterTransactionUseCase(repository);
    const result = await useCase.execute('sender', 'mentioned', 'message', 5);

    expect(repository.save).toHaveBeenCalledWith(expectedTransaction);
    expect(result.senderHandler).toBe('sender');
    expect(result.mentionedHandler).toBe('mentioned');
    expect(result.message).toBe('message');
    expect(result.amount).toBe(5);
  });
});
