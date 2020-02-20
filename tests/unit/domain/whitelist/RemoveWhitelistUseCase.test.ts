import { RemoveWhitelistUseCase } from '../../../../src/domain/whitelist/RemoveWhitelistUseCase';

describe('domain/whitelist/RemoveWhitelistUseCase', () => {
  test('Removes the channel from the whitelist', async () => {
    const repository = {
      delete: jest.fn(),
    } as any;

    const useCase = new RemoveWhitelistUseCase(repository);
    await useCase.execute('channel');

    expect(repository.delete)
      .toHaveBeenCalledWith('channel');
  });
});
