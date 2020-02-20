import { ShowWhitelistUseCase } from '../../../../src/domain/whitelist/ShowWhitelistUseCase';
import { Whitelist } from '../../../../src/entity/Whitelist';

describe('domain/whitelist/ShowWhitelistUseCase', () => {
  test('Shows all the whitelisted channels sorted alphabetically', async () => {
    const list = [
      new Whitelist('channel 1', 'a-channel'),
      new Whitelist('channel 2', 'c-channel'),
      new Whitelist('channel 3', 'z-channel'),
      new Whitelist('channel 4', 'b-channel'),
      new Whitelist('channel 5', 'd-channel'),
    ];

    const repository = {
      find: jest.fn(() => list),
    } as any;

    const useCase = new ShowWhitelistUseCase(repository);
    const result = await useCase.execute();

    const expectedResult = 'The following channels are whitelisted:\n#a-channel\n#b-channel\n#c-channel\n#d-channel\n#z-channel\n';

    expect(repository.find)
      .toHaveBeenCalled();

    expect(result).toStrictEqual(expectedResult);
  });

  test('Shows no channels message when there are no whitelisted channels', async () => {
    const repository = {
      find: jest.fn(() => []),
    } as any;

    const useCase = new ShowWhitelistUseCase(repository);
    const result = await useCase.execute();

    const expectedResult = 'There are no whitelisted channels.';

    expect(repository.find)
      .toHaveBeenCalled();

    expect(result).toStrictEqual(expectedResult);
  });
});
