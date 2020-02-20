import { FindOrCreateWhitelistUseCase } from '../../../../src/domain/whitelist/FindOrCreateWhitelistUseCase';
import { Whitelist } from '../../../../src/entity/Whitelist';

describe('domain/whitelist/FindOrCreateWhitelistUseCase', () => {
  test('Creates a Whitelist when it doesnt exist', async () => {
    const expectedWhitelist = new Whitelist('channel', 'name');

    const repository = {
      findOne: jest.fn(() => null),
      save: jest.fn(),
    } as any;

    const useCase = new FindOrCreateWhitelistUseCase(repository);
    const result = await useCase.execute('channel', 'name');

    expect(repository.findOne)
      .toHaveBeenCalledWith('channel');

    expect(repository.save)
      .toHaveBeenCalledWith(expectedWhitelist);

    expect(result).toStrictEqual(expectedWhitelist);
  });

  test('Returns a Whitelist that already exists', async () => {
    const expectedWhitelist = new Whitelist('channel', 'name');

    const repository = {
      findOne: jest.fn(() => expectedWhitelist),
      save: jest.fn(),
    } as any;

    const useCase = new FindOrCreateWhitelistUseCase(repository);
    const result = await useCase.execute('channel', 'name');

    expect(repository.findOne)
      .toHaveBeenCalledWith('channel');

    expect(repository.save).not.toHaveBeenCalled();
    expect(result).toStrictEqual(expectedWhitelist);
  });
});
