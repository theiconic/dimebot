import { IsWhitelistedUseCase } from '../../../../src/domain/whitelist/IsWhitelistedUseCase';
import { Whitelist } from '../../../../src/entity/Whitelist';

describe('domain/whitelist/IsWhitelistedUseCase', () => {
  test('Returns false to a channel that doesnt exist', async () => {
    const repository = {
      findOne: jest.fn(() => null),
    } as any;

    const useCase = new IsWhitelistedUseCase(repository);
    const result = await useCase.execute('channel');

    expect(repository.findOne)
      .toHaveBeenCalledWith('channel');

    expect(result).toBeFalsy;
  });

  test('Returns true to an existing channel', async () => {
    const expectedWhitelist = new Whitelist('channel', 'name');

    const repository = {
      findOne: jest.fn(() => expectedWhitelist),
    } as any;

    const useCase = new IsWhitelistedUseCase(repository);
    const result = await useCase.execute('channel');

    expect(repository.findOne)
      .toHaveBeenCalledWith('channel');

    expect(result).toBeTruthy;
  });
});
